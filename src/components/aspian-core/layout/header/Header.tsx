import React, {FC} from 'react';
import {
    DirectionActionTypeEnum,
    handleChangeLanguage,
    LanguageActionTypeEnum,
    logout,
    removeAddNewPostTinyMceInstance,
    toggle
} from "../../../../app/store/aspian-core/actions";
import {Col, Dropdown, Layout, Menu, Row, Select} from 'antd';
import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import GetRandomColor from '../../../../js-ts/aspian-core/base/GetRandomColor';
import agent from '../../../../app/api/aspian-core/agent';
import {useTranslation} from 'react-i18next';
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {ILocaleStateType} from "../../../../app/store/aspian-core/reducers/locale/localeReducerTypes";
import {IUserStateType} from "../../../../app/store/aspian-core/reducers/user/userReducerTypes";
import {connect} from "react-redux";
import {ISiderStateType} from "../../../../app/store/aspian-core/reducers/layout/sider/siderReducerTypes";

const {Header} = Layout;

interface IHeaderProps {
    sider: ISiderStateType;
    locale: ILocaleStateType;
    userState: IUserStateType;
    toggle: typeof toggle;
    handleChangeLanguage: typeof handleChangeLanguage;
    logout: Function;
    removeAddNewPostTinyMceInstance: typeof removeAddNewPostTinyMceInstance;
}

const AspianHeader: FC<IHeaderProps> = ({
                                            sider, locale,
                                            userState, toggle, logout,
                                            handleChangeLanguage, removeAddNewPostTinyMceInstance
                                        }) => {
    const {t} = useTranslation('core_header');

    const {collapsed} = sider;
    const {dir, lang} = locale;
    const {user} = userState;

    const langOnChange = (lang: LanguageActionTypeEnum) => {
        // Re-Initialize TinyMCE for PostCreate component after changing language
        removeAddNewPostTinyMceInstance();
        // changing language layout handling
        handleChangeLanguage(lang);
    }

    const menu = (
        <Menu>
            <Menu.Item key="0" style={{fontSize: '.7rem'}}>
                <a href="#!">
                    <ProfileOutlined className="text primary-color"/>{' '}
                    {t('user-menu.items.view-profile')}
                </a>
            </Menu.Item>
            <Menu.Item key="1" style={{fontSize: '.7rem'}}>
                <a href="#!">
                    <SettingOutlined className="text primary-color"/>{' '}
                    {t('user-menu.items.account-settings')}
                </a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item
                key="3"
                style={{fontSize: '.7rem'}}
                onClick={() => logout()}
            >
                <LogoutOutlined className="text danger-color"/>
                {t('user-menu.items.logout')}
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="header">
            <Row>
                <Col span={4}>
                    {dir === DirectionActionTypeEnum.LTR &&
                    React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'header--trigger',
                            onClick: () => toggle(collapsed),
                        }
                    )}
                    {dir === DirectionActionTypeEnum.RTL &&
                    React.createElement(
                        collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,
                        {
                            className: 'header--trigger',
                            onClick: () => toggle(collapsed),
                        }
                    )}
                </Col>
                <Col
                    span={20}
                    style={{
                        textAlign:
                            dir === DirectionActionTypeEnum.LTR
                                ? 'right'
                                : 'left',
                    }}
                >
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a
                            href="#!"
                            style={{padding: '1.3rem 0'}}
                            onClick={(e) => e.preventDefault()}
                        >
                            <Avatar
                                className="header__profile-photo"
                                style={{
                                    backgroundColor: GetRandomColor(),
                                    verticalAlign: 'middle',
                                }}
                                src={
                                    user?.profilePhotoName
                                        ? agent.Attachments.getFileUrl(
                                        user!.profilePhotoName
                                        )
                                        : ''
                                }
                            >
                                {user?.displayName}
                            </Avatar>
                            <span className="header__avatar-text">
                {t('user-menu.user-greeting')} {user?.displayName}
              </span>{' '}
                            <DownOutlined/>
                        </a>
                    </Dropdown>
                    <Select
                        defaultValue={lang}
                        style={{margin: '0 1rem'}}
                        onChange={langOnChange}
                        size="small"
                    >
                        <Select.Option value={LanguageActionTypeEnum.en}>En</Select.Option>
                        <Select.Option value={LanguageActionTypeEnum.fa}>فا</Select.Option>
                    </Select>
                </Col>
            </Row>
        </Header>
    );
};

// Redux State To Map
const mapStateToProps = ({locale, sider, userState}: IStoreState): { locale: ILocaleStateType, userState: IUserStateType, sider: ISiderStateType } => {
    return {locale, sider, userState};
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    toggle,
    handleChangeLanguage,
    logout,
    removeAddNewPostTinyMceInstance
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AspianHeader);
