import { Wrap } from './element-wrap';
import { Dialog, DialogPositioning } from './dialog';
import { UIToolkit } from './ui-toolkit';
import { TranslateFunc } from './models';
import { GiphyService, GiphyGif } from './giphy-service';

export class GiphyPickerDialog extends Dialog {

    private selectedGif: GiphyGif | null = null;
    private readonly giphyService = new GiphyService();
    private searchInput?: Wrap<HTMLInputElement>;
    private gifGrid?: Wrap<HTMLDivElement>;
    private loadingIndicator?: Wrap<HTMLDivElement>;
    private searchTimeout?: number;
    private currentQuery = '';
    private currentOffset = 0;
    private isLoading = false;

    private constructor(t: TranslateFunc, parent: Wrap<any>, pos: DialogPositioning) {
        super(t, parent, t('btnGiphy') || 'GIPHY GIFs', pos);
    }

    static async run(t: TranslateFunc, parent: Wrap<any>, pos: DialogPositioning): Promise<GiphyGif | null> {
        const dlg = new GiphyPickerDialog(t, parent, pos);
        await dlg.run(null);
        return dlg.selectedGif;
    }

    override renderContent(): Wrap<any> {
        this.searchInput = UIToolkit.input('text', 'giphy-search-input')
            .attr({ placeholder: this.t('giphySearchPlaceholder') || 'Search GIFs...' })
            .on('input', () => this.handleSearchInput());

        this.loadingIndicator = UIToolkit.div('giphy-loading', 'hidden')
            .append(UIToolkit.icon('gear'));

        this.gifGrid = UIToolkit.div('giphy-grid');

        this.loadTrendingGifs();

        return UIToolkit.div('giphy-picker-content')
            .append(
                UIToolkit.div('giphy-search-section')
                    .append(this.searchInput),
                this.loadingIndicator,
                this.gifGrid,
                UIToolkit.div('giphy-attribution')
                    .append(
                        UIToolkit.span('Powered by '),
                        UIToolkit.a('GIPHY', 'https://giphy.com')
                            .attr({ target: '_blank', rel: 'noopener noreferrer' })
                    )
            );
    }

    override onShow() {
        this.searchInput?.focus();
    }

    private handleSearchInput() {
        const query = this.searchInput?.val.trim() || '';
        

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = window.setTimeout(() => {
            this.currentQuery = query;
            this.currentOffset = 0;
            if (query) {
                this.searchGifs(query);
            } else {
                this.loadTrendingGifs();
            }
        }, 300);
    }

    private async loadTrendingGifs() {
        try {
            this.setLoading(true);
            const response = await this.giphyService.getTrendingGifs(20, 0);
            this.renderGifs(response.data);
        } catch (error) {
            this.showError('Failed to load trending GIFs');
        } finally {
            this.setLoading(false);
        }
    }

    private async searchGifs(query: string) {
        try {
            this.setLoading(true);
            const response = await this.giphyService.searchGifs(query, 20, 0);
            this.renderGifs(response.data);
        } catch (error) {
            this.showError('Failed to search GIFs');
        } finally {
            this.setLoading(false);
        }
    }

    private renderGifs(gifs: GiphyGif[]) {
        if (!this.gifGrid) return;

        this.gifGrid.html('');

        if (gifs.length === 0) {
            this.gifGrid.append(
                UIToolkit.div('giphy-no-results')
                    .inner(this.t('giphyNoResults') || 'No GIFs found')
            );
            return;
        }

        gifs.forEach(gif => {
            const gifItem = UIToolkit.div('giphy-item')
                .click(() => {
                    this.selectedGif = gif;
                    this.dismiss(true);
                })
                .append(
                    Wrap.new('img')
                        .attr({ 
                            src: gif.images.fixed_height_small.url,
                            alt: gif.title,
                            width: gif.images.fixed_height_small.width,
                            height: gif.images.fixed_height_small.height,
                            loading: 'lazy'
                        })
                        .classes('giphy-thumbnail')
                );

            this.giphyService.registerAnalytics(gif.analytics.onload.url);

            this.gifGrid!.append(gifItem);
        });
    }

    private setLoading(loading: boolean) {
        this.isLoading = loading;
        this.loadingIndicator?.setClasses(!loading, 'hidden');
        this.gifGrid?.setClasses(loading, 'hidden');
    }

    private showError(message: string) {
        if (!this.gifGrid) return;

        this.gifGrid.html('');
        this.gifGrid.append(
            UIToolkit.div('giphy-error')
                .inner(message)
        );
    }
}