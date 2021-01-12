export interface ISite {
    id: string;
    domain: string;
    path: string;
    siteType: SiteTypeEnum;
    IsActivated: boolean;
}

export enum SiteTypeEnum
{
    Blog = "Blog",
    Store = "Store",
    LMS = "LMS",
    eHealth = "eHealth"
}