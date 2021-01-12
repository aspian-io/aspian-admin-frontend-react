////////////////////////
/// Root Action Type ///
////////////////////////
export type SiderAction = IToggleSiderAction | IToggleSiderOnBreakpointAction;

/////////////
/// Types ///
/////////////
export enum SiderActionTypes {
    TOGGLE_SIDER = "TOGGLE_SIDER",
    TOGGLE_SIDER_ON_BREAKPOINT = "TOGGLE_SIDER_ON_BREAKPOINT"
}

////////////////////
/// Action Types ///
////////////////////
export interface IToggleSiderAction {
    type: SiderActionTypes.TOGGLE_SIDER;
    payload: {
        collapsed: boolean
    };
}

export interface IToggleSiderOnBreakpointAction {
    type: SiderActionTypes.TOGGLE_SIDER_ON_BREAKPOINT;
    payload: {
        collapsed: boolean
    };
}