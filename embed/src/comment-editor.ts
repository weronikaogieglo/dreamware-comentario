import { Wrap } from './element-wrap';
import { UIToolkit } from './ui-toolkit';
import { AsyncProcWithArg, PageInfo, TranslateFunc } from './models';
import { Utils } from './utils';
import { BlockEditorCommand, EditorCommand, InlineEditorCommand, EmojiPickerCommand, GiphyPickerCommand } from './editor-command';
import { EmojiPickerDialog } from './emoji-picker-dialog';
import { GiphyPickerDialog } from './giphy-picker-dialog';

export type CommentEditorPreviewCallback = (markdown: string) => Promise<string>;

export class CommentEditor extends Wrap<HTMLFormElement> {

    private readonly textarea: Wrap<HTMLTextAreaElement>;
    private readonly preview: Wrap<HTMLDivElement>;
    private readonly btnCancel: Wrap<HTMLButtonElement>;
    private readonly btnPreview: Wrap<HTMLButtonElement>;
    private readonly btnSubmit: Wrap<HTMLButtonElement>;
    private readonly toolbar: Wrap<HTMLDivElement>;
    private readonly commands = this.createCommands();
    private readonly isEdit: boolean;

    private previewing = false;
    private submitting = false;

    /**
     * Create a new editor for editing comment text.
     * @param t Function for obtaining translated messages.
     * @param parent Parent element to host the editor.
     * @param isEdit Whether it's adding a new comment (false) or editing an existing one (true).
     * @param initialText Initial text to insert into the editor.
     * @param pageInfo Current page data.
     * @param onCancel Cancel callback.
     * @param onSubmit Submit callback.
     * @param onPreview Preview callback.
     */
    constructor(
        private readonly t: TranslateFunc,
        private readonly parent: Wrap<any>,
        isEdit: boolean,
        initialText: string,
        private readonly pageInfo: PageInfo,
        private readonly onCancel: AsyncProcWithArg<CommentEditor>,
        private readonly onSubmit: AsyncProcWithArg<CommentEditor>,
        private readonly onPreview: CommentEditorPreviewCallback,
    ) {
        super(UIToolkit.form(() => this.submitEdit(), () => this.cancelEdit()).element);

        this.isEdit = isEdit;

        this.btnCancel = UIToolkit.button(this.t('actionCancel'), () => onCancel(this), 'btn-link');
        this.btnPreview = UIToolkit.button(this.t('actionPreview'), () => this.togglePreview(), 'btn-secondary');
        this.btnSubmit = UIToolkit.submit(this.t(isEdit ? 'actionSave' : 'actionAddComment'), false);

        this.toolbar = this.renderToolbar();

        this.classes('comment-editor')
            .append(

                this.toolbar,

                this.textarea = UIToolkit.textarea(null, true, true)
                    .attr({ name: 'comentario-comment-editor', maxlength: String(pageInfo.maxCommentLength) })
                    .value(initialText)
                    .on('input', () => this.updateControls()),
                // Preview
                this.preview = UIToolkit.div('comment-editor-preview', 'hidden'),
            );

        // Install keyboard shortcuts
        this.installShortcuts();

        // Update the parent
        this.parent.classes('editor-inserted').prepend(this);

        // Update the buttons
        this.updateControls();

        // Focus the textarea
        this.textarea.focus();
    }

    /**
     * Markdown text entered in the editor, trimmed of all leading and trailing whitespace.
     */
    get markdown(): string {
        return this.textarea.val.trim();
    }

    /**
     * Update the parent on editor removal.
     */
    override remove(): CommentEditor {
        this.parent.noClasses('editor-inserted');
        return super.remove() as CommentEditor;
    }

    private async togglePreview() {
        // Toggle the value
        this.previewing = !this.previewing;

        // Request a comment text rendering
        let html = '';
        if (this.previewing) {
            try {
                html = await this.btnPreview.spin(() => this.onPreview(this.markdown));
            } catch (e: any) {
                html = `${this.t('previewFailed')}: ${e.message || '(unknown error)'}`;
            }
        }
        this.preview.html(html);

        // Update control states
        this.updateControls();

        // Focus the editor after leaving the preview
        if (!this.previewing) {
            this.textarea.focus();
        }
    }

    /**
     * Create and return a list of applicable editor commands.
     * @private
     */
    private createCommands(): EditorCommand[] {
        const r: EditorCommand[] = [];

        r.push(
            new EmojiPickerCommand({
                icon: 'emoji',
                titleId: 'btnEmoji',
                onEmojiSelect: (emoji: string, textarea: HTMLTextAreaElement) => {
                    this.insertEmoji(emoji, textarea);
                }
            })
        );

        r.push(
            new GiphyPickerCommand({
                icon: 'giphy',
                titleId: 'btnGiphy',
                onGifSelect: async (gif: any, textarea: HTMLTextAreaElement) => {
                    await this.insertGif(gif, textarea);
                }
            })
        );

        return r;

    }

    /**
     * Update the editor controls' state according to the current situation.
     * @private
     */
    private updateControls() {
        // Disable the toolbar while previewing or submitting
        this.toolbar.setClasses(this.previewing || this.submitting, 'disabled');

        // Disable the textarea and the Cancel button during submission
        this.textarea.disabled(this.submitting);
        this.btnCancel.disabled(this.submitting);

        // Disable the Preview/Submit buttons if the text is empty or during submission
        const cannotPost = !this.markdown || this.submitting;
        this.btnPreview.disabled(cannotPost).setClasses(this.previewing, 'btn-active');
        this.btnSubmit.disabled(cannotPost).setClasses(this.submitting, 'spinner');

        // Hide the textarea and show the preview in the preview mode
        this.textarea.setClasses(this.previewing, 'hidden');
        this.preview.setClasses(!this.previewing, 'hidden');
    }

    private renderToolbar(): Wrap<HTMLDivElement> {
        return UIToolkit.div('toolbar').append(
            // Left section: add a button for each command
            UIToolkit.div('toolbar-section')
                .append(...this.commands.map(
                    c => UIToolkit.toolButton(c.icon, this.t(c.titleId) + c.keyTitle, () => this.runCommand(c)))),
            UIToolkit.div('toolbar-section').append(
                this.btnCancel,
                this.btnPreview,
                this.btnSubmit,
                UIToolkit.a('', Utils.joinUrl(this.pageInfo.baseDocsUrl, this.pageInfo.defaultLangId, 'kb/comment-editor/'))
                    .classes('btn', 'btn-tool')
                    .attr({ title: this.t('btnEditorHelp') })
                    .append(UIToolkit.icon('help')),
            ));
    }

    /**
     * Install keyboard shortcuts on the editor.
     * @private
     */
    private installShortcuts() {
        this.textarea.keydown((_, e) => {
            // Try to find a command that matches the key combination
            const cmd = this.commands.find(c => c.matchesKeyEvent(e));
            if (cmd) {
                // Command found: cancel the default handling of the event in the browser
                e.preventDefault();
                e.stopPropagation();

                // Invoke the command
                this.runCommand(cmd);
            }
        });
    }

    /**
     * Run the given command against the current editor.
     * @param c Command to run.
     * @private
     */
    private async runCommand(c: EditorCommand) {
        // Check if it's an emoji picker command
        if (c instanceof EmojiPickerCommand) {
            await this.showEmojiPicker();
        } else if (c instanceof GiphyPickerCommand) {
            await this.showGiphyPicker();
        } else {
            // Apply the command
            c.apply(this.textarea.element);
        }

        // Update controls to reflect changes in the text
        this.updateControls();

        // Re-focus the textarea
        this.textarea.focus();
    }

    /**
     * Submit the form.
     * @private
     */
    private async submitEdit(): Promise<void> {
        // Don't allow resubmissions
        if (this.submitting) {
            return;
        }

        // Disable the toolbar and the buttons
        this.submitting = true;
        this.updateControls();
        try {
            // Invoke the callback
            await this.onSubmit(this);
        } finally {
            this.submitting = false;
            this.updateControls();
        }
    }

    /**
    * Show the emoji picker dialog and insert selected emoji.
    * @private
    */
    private async showEmojiPicker() {
        try {
            const emoji = await EmojiPickerDialog.run(
                this.t,
                this.parent,
                { ref: this.toolbar, placement: 'bottom-start' }
            );

            if (emoji) {
                this.insertEmoji(emoji, this.textarea.element);
            }
        } catch (error) {
            console.error('Failed to show emoji picker:', error);
        }
    }

    /**
     * Insert emoji at cursor position or replace selection.
     * @param emoji Emoji to insert.
     * @param textarea Textarea element.
     * @private
     */
    /**
     * Insert emoji at cursor position or replace selection.
     * @param emoji Emoji to insert.
     * @param textarea Textarea element.
     * @private
     */
    private insertEmoji(emoji: string, textarea: HTMLTextAreaElement) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        // Replace selection with emoji or insert at cursor
        const newText = text.substring(0, start) + emoji + text.substring(end);
        textarea.value = newText;

        // Set cursor position after emoji
        const newPosition = start + emoji.length;
        textarea.setSelectionRange(newPosition, newPosition);

        // Trigger input event to update controls
        this.updateControls();
    }

    /**
     * Show the GIPHY picker dialog and insert selected GIF.
     * @private
     */
    private async showGiphyPicker() {
        try {
            const gif = await GiphyPickerDialog.run(
                this.t,
                this.parent,
                { ref: this.toolbar, placement: 'bottom-start' }
            );

            if (gif) {
                await this.insertGif(gif, this.textarea.element);
            }
        } catch (error) {
            console.error('Failed to show GIPHY picker:', error);
        }
    }

    /**
     * Insert GIF at cursor position or replace selection.
     * @param gif GIF object to insert.
     * @param textarea Textarea element.
     * @private
     */
    private async insertGif(gif: any, textarea: HTMLTextAreaElement) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        // Create markdown image link for the GIF
        const gifMarkdown = `![${gif.title}](${gif.images.original.url})`;

        // Replace selection with GIF markdown or insert at cursor
        const newText = text.substring(0, start) + gifMarkdown + text.substring(end);
        textarea.value = newText;

        // Set cursor position after GIF markdown
        const newPosition = start + gifMarkdown.length;
        textarea.setSelectionRange(newPosition, newPosition);

        // Trigger input event to update controls
        this.updateControls();

        // Automatically enable preview mode to show the GIF
        if (!this.previewing) {
            await this.togglePreview();
        }
    }
    /**
 * Cancel the editor.
 * @private
 */
    private cancelEdit() {
        // Ignore while submitting
        if (this.submitting) {
            return;
        }

        // Invoke the callback
        this.onCancel(this);
    }
}
