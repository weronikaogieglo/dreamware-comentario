export interface GiphyGif {
    id: string;
    title: string;
    url: string;
    images: {
        fixed_height: {
            url: string;
            width: string;
            height: string;
        };
        fixed_height_small: {
            url: string;
            width: string;
            height: string;
        };
        original: {
            url: string;
            width: string;
            height: string;
        };
    };
    analytics: {
        onload: { url: string };
        onclick: { url: string };
        onsent: { url: string };
    };
}

export interface GiphySearchResponse {
    data: GiphyGif[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}

export interface GiphyTrendingResponse {
    data: GiphyGif[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}

export class GiphyService {
    private readonly apiKey = 'MLlblcDSqQFCpGoo0JRJX0QGBzQ2YpzH'; 
    private readonly baseUrl = 'https://api.giphy.com/v1';

    async searchGifs(query: string, limit: number = 20, offset: number = 0): Promise<GiphySearchResponse> {
        const url = `${this.baseUrl}/gifs/search?api_key=${this.apiKey}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`GIPHY API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GIPHY search error:', error);
            throw error;
        }
    }

    async getTrendingGifs(limit: number = 20, offset: number = 0): Promise<GiphyTrendingResponse> {
        const url = `${this.baseUrl}/gifs/trending?api_key=${this.apiKey}&limit=${limit}&offset=${offset}&rating=g`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`GIPHY API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GIPHY trending error:', error);
            throw error;
        }
    }

    async registerAnalytics(analyticsUrl: string): Promise<void> {
        try {
            await fetch(analyticsUrl, { method: 'GET' });
        } catch (error) {
            console.error('GIPHY analytics error:', error);
        }
    }
}