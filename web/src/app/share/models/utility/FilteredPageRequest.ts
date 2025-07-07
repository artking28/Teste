import {Indexable} from "@app/share/models/utility/Indexable";

export class FilteredPageRequest<T extends Indexable<any>> {
    page: number;
    size: number;
    sortBy: string;
    direction: 'ASC' | 'DESC';
    content: T;
}
