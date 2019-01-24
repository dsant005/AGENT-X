import { Widget } from '@app/core/models/widgets.interface';

export interface Scrape {
    url: string;
    root: string;
    title: string;
    widgets: Array<Widget>;
}
