import {IGetSiteInfoAction, SiteActionTypes} from "..";
import {Dispatch} from "redux";
import {SiteTypeEnum} from "../../../models/site";
import agent from "../../../api/aspian-core/agent";

export const getSiteInfo = (siteType: SiteTypeEnum) => async (dispatch: Dispatch) => {
    try {
        const site = await agent.Site.details(siteType);
        dispatch<IGetSiteInfoAction>({
            type: SiteActionTypes.GET_SITE_INFO,
            payload: {site}
        })
    } catch (err) {
        console.log(err);
    }
}