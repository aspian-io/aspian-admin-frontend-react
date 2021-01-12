export interface ITaxonomy {
    id?: string;
    type: TaxonomyTypeEnum;
    term: ITerm;
    parentId: string | null;
    childTaxonomies?: ITaxonomy[];
    siteId?: string;
}

export enum TaxonomyTypeEnum {
    nav_menu,
    category,
    tag,
}

export interface ITerm {
    id?: string;
    name: string;
    slug: string;
}

export class Term implements ITerm {
    id?: string = '';
    name: string = '';
    slug: string = '';

    constructor(init?: ITerm) {
        Object.assign(this, init);
    }
}

export class Taxonomy implements ITaxonomy {
    id: string = '';
    type: TaxonomyTypeEnum = 1;
    term: ITerm = new Term();
    parentId: string | null = null;
    childTaxonomies: ITaxonomy[] = [];
    siteId: string = '';

    constructor(init?: ITaxonomy) {
        Object.assign(this, init);
    }
}