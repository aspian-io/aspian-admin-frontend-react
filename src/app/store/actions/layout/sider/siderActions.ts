import {SiderActionTypes, IToggleSiderAction, IToggleSiderOnBreakpointAction} from "./siderActionTypes";

export const toggle = (collapsed: boolean): IToggleSiderAction => {
    const contentLayoutDirectionIsRtl = document
        .getElementById('contentLayout')!
        .classList.contains('ant-layout-rtl');

    if (collapsed) {
        if (!contentLayoutDirectionIsRtl)
            document.getElementById('contentLayout')!.style.marginLeft = '230px';
        else
            document.getElementById('contentLayout')!.style.marginRight = '230px';
    } else {
        if (!contentLayoutDirectionIsRtl)
            document.getElementById('contentLayout')!.style.marginLeft = '0';
        else document.getElementById('contentLayout')!.style.marginRight = '0';
    }

    ///
    return {
        type: SiderActionTypes.TOGGLE_SIDER,
        payload: {collapsed: !collapsed}
    }
}

export const onLayoutBreakpoint = (broken: boolean, isRtl: boolean): IToggleSiderOnBreakpointAction => {
    if (broken) {
        if (document.getElementById('contentLayout')) {
            document.getElementById('contentLayout')!.style.marginLeft = '0';
            document.getElementById('contentLayout')!.style.marginRight = '0';
            document.getElementById('appLayout')!.style.overflow = 'hidden';
            document.getElementById('contentLayout')!.style.minWidth = `100%`;
        }

        ///
        return {
            type: SiderActionTypes.TOGGLE_SIDER_ON_BREAKPOINT,
            payload: {collapsed: broken}
        }
    } else {
        if (document.getElementById('contentLayout')) {
            if (isRtl) {
                document.getElementById('contentLayout')!.style.marginRight = '230px';
                document.getElementById('contentLayout')!.style.marginLeft = '0';
            } else {
                document.getElementById('contentLayout')!.style.marginLeft = '230px';
                document.getElementById('contentLayout')!.style.marginRight = '0';
            }

            document.getElementById('appLayout')!.style.overflow = 'initial';
            document.getElementById('contentLayout')!.style.minWidth = `initial`;
        }

        ///
        return {
            type: SiderActionTypes.TOGGLE_SIDER_ON_BREAKPOINT,
            payload: {collapsed: broken}
        }
    }
}