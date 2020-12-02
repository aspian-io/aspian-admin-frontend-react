import React, {FC} from 'react';
import {Layout} from 'antd';
import AspianMenu from './menu/Menu';
import {connect} from "react-redux";
import {LanguageActionTypeEnum, onLayoutBreakpoint} from "../../../../app/store/aspian-core/actions";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {ISiderStateType} from "../../../../app/store/aspian-core/reducers/layout/sider/siderReducerTypes";
import {ILocaleStateType} from "../../../../app/store/aspian-core/reducers/locale/localeReducerTypes";

const {Sider} = Layout;

interface ISiderProps {
    sider: ISiderStateType;
    locale: ILocaleStateType;
    onLayoutBreakpoint: typeof onLayoutBreakpoint;
}

const AspianSider: FC<ISiderProps> = ({sider, locale, onLayoutBreakpoint}) => {
    const {collapsed} = sider;
    const {lang} = locale;

    return (
        <Sider
            className='sider'
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            collapsible
            collapsed={collapsed}
            onBreakpoint={(broken) => onLayoutBreakpoint(broken, lang !== LanguageActionTypeEnum.en)}
        >
            <AspianMenu/>
        </Sider>
    );
};

// Redux State To Map
const mapStateToProps = ({sider, locale}: IStoreState): { sider: ISiderStateType, locale: ILocaleStateType } => {
    return {
        sider,
        locale
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    onLayoutBreakpoint
}

export default connect(mapStateToProps, mapDispatchToProps)(AspianSider);
