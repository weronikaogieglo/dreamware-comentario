import { Wrap } from './element-wrap';
import { Dialog, DialogPositioning } from './dialog';
import { UIToolkit } from './ui-toolkit';
import { TranslateFunc } from './models';

export class EmojiPickerDialog extends Dialog {

    private selectedEmoji: string = '';

    private constructor(t: TranslateFunc, parent: Wrap<any>, pos: DialogPositioning) {
        super(t, parent, t('btnEmoji'), pos);
    }


    static async run(t: TranslateFunc, parent: Wrap<any>, pos: DialogPositioning): Promise<string> {
        const dlg = new EmojiPickerDialog(t, parent, pos);
        await dlg.run('');
        return dlg.selectedEmoji;
    }

    override renderContent(): Wrap<any> {
        const emojis = [
            '😊', '😂', '❤️', '👍', '🎉', '🔥', '😍', '😭', '😅', '🤔',
            '😎', '😢', '😡', '😱', '😴', '🤗', '😋', '😇', '😈', '👻',
            '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈',
            '🙉', '🙊', '💪', '👏', '🙏', '👋', '🤝', '👌', '✌️', '🤞',
            '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👌',
            '💯', '💢', '💥', '💫', '💦', '💨', '💬', '🗨️', '🗯️', '💭',
            '💤', '💢', '💥', '💫', '💦', '💨', '💬', '🗨️', '🗯️', '💭'
        ];

        const emojiGrid = UIToolkit.div('emoji-grid');
        
        emojis.forEach(emoji => {
            const emojiButton = UIToolkit.span(emoji, 'emoji-item')
                .click(() => {
                    this.selectedEmoji = emoji;
                    this.dismiss(true);
                });
            emojiGrid.append(emojiButton);
        });

        return UIToolkit.div('emoji-picker-content')
            .append(emojiGrid);
    }

    override onShow() {
        const firstEmoji = this.dialogBoxElement?.element.querySelector('.emoji-item') as HTMLElement;
        if (firstEmoji) {
            firstEmoji.focus();
        }
    }
}