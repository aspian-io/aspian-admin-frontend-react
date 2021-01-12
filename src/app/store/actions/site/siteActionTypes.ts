

////////////////////////
/// Root Action Type ///
////////////////////////
import {ISite} from "../../../models/site";

export type SiteAction = IGetSiteInfoAction;

/////////////
/// Types ///
/////////////
export enum SiteActionTypes {
    GET_SITE_INFO = "GET_SITE_INFO"
}

////////////////////
/// Action Types ///
////////////////////
export interface IGetSiteInfoAction {
    type: SiteActionTypes.GET_SITE_INFO,
    payload: {
        site: ISite
    }
}