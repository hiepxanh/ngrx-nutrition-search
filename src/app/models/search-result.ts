export interface ISearchResult {
    id: string;
    name: string;
}

export class SearchResult implements ISearchResult {
    id: string;
    name: string;
    constructor(obj?:any) {
        this.id = obj.nbdno || '';
        this.name = obj.name || '';
    }
}
