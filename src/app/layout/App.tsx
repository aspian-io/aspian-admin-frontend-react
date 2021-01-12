import React, {FC, Fragment, useEffect} from 'react';
import {Redirect, Route, withRouter, Switch, RouteComponentProps} from 'react-router-dom';

import {connect} from "react-redux";
import {
    DirectionActionTypeEnum,
    getCurrentUser,
    LanguageActionTypeEnum,
    onLayoutBreakpoint,
    setAppLoaded
} from "../store/actions";
import {IStoreState} from "../store/rootReducerTypes";

import i18n from '../../locales/i18n';
import enUS from 'antd/es/locale/en_US';
import faIR from 'antd/es/locale/fa_IR';
import '../../scss/base/_font-fa.scss';

import {ConfigProvider, Layout, Spin} from 'antd';
import 'antd/dist/antd.css';

import Dashboard from '../../components/dashboard/Dashboard';
import AspianHeader from '../../components/layout/header/Header';
import AspianBreadcrumb from '../../components/layout/breadcrumb/AspianBreadcrumb';
import AspianSider from '../../components/layout/sider/Sider';
import AspianFooter from '../../components/layout/footer/Footer';
import PostList from '../../components/post/postList/PostList';
import PostDetails from '../../components/post/postDetails/PostDetails';
import PostCreate from '../../components/post/postCreate/PostCreate';
import Login from '../../components/user/Login';
import Register from '../../components/user/Register';
import ResultPage from '../../components/layout/result/ResultPage';
import BadRequest from '../../components/layout/result/BadRequest';
import NotFound from '../../components/layout/result/NotFound';
import ServerError from '../../components/layout/result/ServerError';
import NetworkProblem from '../../components/layout/result/NetworkProblem';
import Unauthorized401 from '../../components/layout/result/Unauthorized401';
import Unauthorized403 from '../../components/layout/result/Unauthorized403';

import {ILocaleStateType} from "../store/reducers/locale/localeReducerTypes";
import {IUserStateType} from "../store/reducers/user/userReducerTypes";

interface IAppProps {
    onLayoutBreakpoint: typeof onLayoutBreakpoint;
    locale: ILocaleStateType;
    userState: IUserStateType;
    getCurrentUser: Function;
    setAppLoaded: Function;
}

const App: FC<IAppProps & RouteComponentProps> = ({locale, onLayoutBreakpoint, userState, getCurrentUser, setAppLoaded, location}) => {
    const {lang, dir} = locale;
    const {isAppLoaded, user} = userState;
    const {Content} = Layout;


    useEffect(() => {
        if (user === null) {
            getCurrentUser().then(() => setAppLoaded());
        } else {
            setAppLoaded();
        }
        if (window.innerWidth >= 992)
            onLayoutBreakpoint(
                false,
                dir !== DirectionActionTypeEnum.LTR
            );
        i18n.changeLanguage(lang);
    }, [
        dir,
        lang,
        getCurrentUser,
        user,
        setAppLoaded,
        onLayoutBreakpoint
    ]);

    if (lang === LanguageActionTypeEnum.fa) {
        document.body.style.fontFamily = 'Vazir';
    }

    if (!isAppLoaded) {
        return (
            <div className="spinner-wrapper">
                <Spin wrapperClassName="spinner-wrapper"/>
            </div>
        );
    }

    return (
        <ConfigProvider
            direction={
                dir === DirectionActionTypeEnum.LTR ? 'ltr' : 'rtl'
            }
            locale={lang === LanguageActionTypeEnum.en ? enUS : faIR}
        >
            <Layout className="aspian__layout" id="appLayout">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            !!user ? (
                                <Redirect to="/admin"/>
                            ) : (
                                <Redirect to="/login"/>
                            )
                        }
                    />
                    {!user && (
                        <Route exact path="/login" component={Login}/>
                    )}
                    {!!user && (
                        <Route
                            exact
                            path="/login"
                            render={() => <Redirect to="/admin"/>}
                        />
                    )}
                    <Route exact path="/unauthorized401" component={Unauthorized401}/>
                    <Route exact path="/unauthorized403" component={Unauthorized403}/>
                    <Route
                        path={'/(.+)'}
                        render={() => (
                            <Fragment>
                                <AspianSider/>
                                <Layout className="aspian__layout--content" id="contentLayout">
                                    <AspianHeader/>
                                    <Content className="content">
                                        <AspianBreadcrumb/>
                                        <div className="content-wrapper">
                                            <Switch>
                                                <Route exact path="/admin" component={Dashboard}/>
                                                <Route exact path="/register" component={Register}/>
                                                <Route exact path="/admin/posts" component={PostList}/>
                                                <Route
                                                    exact
                                                    path="/admin/posts/details/:id"
                                                    component={PostDetails}
                                                />
                                                <Route
                                                    key={location.key}
                                                    path={["/admin/posts/add-new", "/admin/posts/edit/:id"]}
                                                    component={PostCreate}
                                                />
                                                <Route path="/badrequest" component={BadRequest}/>
                                                <Route path="/notfound" component={NotFound}/>
                                                <Route path="/server-error" component={ServerError}/>
                                                <Route
                                                    path="/network-error"
                                                    component={NetworkProblem}
                                                />
                                                <Route
                                                    path={['/admin/post-deletion-result']}
                                                    component={ResultPage}
                                                />
                                            </Switch>
                                        </div>
                                    </Content>
                                    <AspianFooter/>
                                </Layout>
                            </Fragment>
                        )}
                    />
                </Switch>
            </Layout>
        </ConfigProvider>
    );
};

// Redux State To Map
const mapStateToProps = ({locale, userState}: IStoreState): { locale: ILocaleStateType, userState: IUserStateType } => {
    return {locale, userState}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    onLayoutBreakpoint,
    setAppLoaded,
    getCurrentUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
