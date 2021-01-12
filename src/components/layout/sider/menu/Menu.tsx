import React, {FC} from 'react';
import {toggle} from "../../../../app/store/actions";
import {Menu} from 'antd';
import Logo from '../../../../assets/Logo.svg';
import {
    CloudServerOutlined,
    CommentOutlined,
    ControlOutlined,
    DashboardOutlined,
    DiffOutlined,
    FormatPainterOutlined,
    FundViewOutlined,
    PushpinOutlined,
    TeamOutlined,
    DollarOutlined,
    AppstoreOutlined,
    CustomerServiceOutlined,
    GiftOutlined, CalendarOutlined,
    SolutionOutlined,
    ReadOutlined,
    TrophyOutlined,
    AuditOutlined,
    HeartOutlined,
    HourglassOutlined,
    ReconciliationOutlined
} from '@ant-design/icons';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";

interface IMenuProps {
    toggle: typeof toggle;
}

const {SubMenu} = Menu;
const AspianMenu: FC<RouteComponentProps & IMenuProps> = ({location, toggle}) => {
    const {t} = useTranslation(['core_menu', 'core_common']);

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            onSelect={({
                           item,
                           key, keyPath,
                           selectedKeys,
                           domEvent
                       }) =>
                toggle(false)
            }
        >
            <Menu.Item className="sider__menu-logo" disabled>
                  <span className="anticon">
                    <img
                        src={Logo}
                        alt="logo"
                        width="24px"
                        height="24px"
                        style={{marginTop: '-8px'}}
                    />
                  </span>

                <span style={{color: '#fff', fontSize: '1.1rem'}}>
                    {t('core_common:appName')}
                  </span>
            </Menu.Item>
            <Menu.ItemGroup key="aspian-core"
                            title={<span style={{color: "hsla(0,0%,100%,.2)"}}>{t('sections.main-section')}</span>}>
                <Menu.Item
                    key="/admin"
                    icon={<DashboardOutlined className="sider__menu-icon"/>}
                >
                    <Link to="/admin">{t('items.dashboard.name')}</Link>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    icon={<PushpinOutlined className="sider__menu-icon"/>}
                    title={t('items.posts.name')}
                >
                    <Menu.Item key="/admin/posts">
                        <Link to="/admin/posts">{t('items.posts.items.all-posts')}</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/posts/add-new">
                        <Link to="/admin/posts/add-new">{t('items.posts.items.add-new')}</Link>
                    </Menu.Item>
                    <Menu.Item key="4">{t('items.posts.items.categories')}</Menu.Item>
                    <Menu.Item key="5">{t('items.posts.items.tags')}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    icon={<CloudServerOutlined className="sider__menu-icon"/>}
                    title={t('items.media.name')}
                >
                    <Menu.Item key="6">{t('items.media.items.library')}</Menu.Item>
                    <Menu.Item key="7">{t('items.media.items.add-new')}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    icon={<DiffOutlined className="sider__menu-icon"/>}
                    title={t('items.pages.name')}
                >
                    <Menu.Item key="8">{t('items.pages.items.all-pages')}</Menu.Item>
                    <Menu.Item key="9">{t('items.pages.items.add-new')}</Menu.Item>
                </SubMenu>
                <Menu.Item
                    key="10"
                    icon={<CommentOutlined className="sider__menu-icon"/>}
                >
                    {t('items.comments.name')}
                </Menu.Item>
                <SubMenu
                    key="sub4"
                    icon={<FormatPainterOutlined className="sider__menu-icon"/>}
                    title={t('items.appearance.name')}
                >
                    <Menu.Item key="11">{t('items.appearance.items.customize')}</Menu.Item>
                    <Menu.Item key="12">{t('items.appearance.items.menus')}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub5"
                    icon={<TeamOutlined className="sider__menu-icon"/>}
                    title={t('items.users.name')}
                >
                    <Menu.Item key="13">{t('items.users.items.all-users')}</Menu.Item>
                    <Menu.Item key="14">{t('items.users.items.add-new')}</Menu.Item>
                    <Menu.Item key="15">{t('items.users.items.your-profile')}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub6"
                    icon={<ControlOutlined className="sider__menu-icon"/>}
                    title={t('items.settings.name')}
                >
                    <Menu.Item key="16">{t('items.settings.items.general')}</Menu.Item>
                    <Menu.Item key="17">{t('items.settings.items.writing')}</Menu.Item>
                    <Menu.Item key="18">{t('items.settings.items.reading')}</Menu.Item>
                    <Menu.Item key="19">{t('items.settings.items.discussion')}</Menu.Item>
                    <Menu.Item key="20">{t('items.settings.items.media')}</Menu.Item>
                    <Menu.Item key="21">{t('items.settings.items.permalinks')}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub7"
                    icon={<FundViewOutlined className="sider__menu-icon"/>}
                    title={t('items.reports.name')}
                >
                    <Menu.Item key="22">
                        {t('items.reports.items.users-activities')}
                    </Menu.Item>
                </SubMenu>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="aspian-store"
                            title={<span style={{color: "hsla(0,0%,100%,.2)"}}>{t('sections.store-section')}</span>}>
                <Menu.Item
                    key="23"
                    icon={<DashboardOutlined className="sider__menu-icon"/>}
                >
                    <Link to="/admin">{t('items.dashboard.name')}</Link>
                </Menu.Item>
                <SubMenu
                    key="sub8"
                    icon={<DollarOutlined className="sider__menu-icon"/>}
                    title={t('items.sales.name')}
                >
                    <Menu.Item key="24">
                        <Link to="">{t('items.sales.items.orders')}</Link>
                    </Menu.Item>
                    <Menu.Item key="25">
                        <Link to="">{t('items.sales.items.invoices')}</Link>
                    </Menu.Item>
                    <Menu.Item key="26">
                        <Link to="">{t('items.sales.items.shipments')}</Link>
                    </Menu.Item>
                    <Menu.Item key="27">
                        <Link to="">{t('items.sales.items.transactions')}</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub9"
                    icon={<AppstoreOutlined className="sider__menu-icon"/>}
                    title={t('items.catalog.name')}
                >
                    <Menu.Item key="28">
                        <Link to="">{t('items.catalog.items.products')}</Link>
                    </Menu.Item>
                    <Menu.Item key="29">
                        <Link to="">{t('items.catalog.items.categories')}</Link>
                    </Menu.Item>
                    <Menu.Item key="30">
                        <Link to="">{t('items.catalog.items.monitoring')}</Link>
                    </Menu.Item>
                    <Menu.Item key="31">
                        <Link to="">{t('items.catalog.items.attrs-and-features')}</Link>
                    </Menu.Item>
                    <Menu.Item key="32">
                        <Link to="">{t('items.catalog.items.brands-and-suppliers')}</Link>
                    </Menu.Item>
                    <Menu.Item key="33">
                        <Link to="">{t('items.catalog.items.discounts')}</Link>
                    </Menu.Item>
                    <Menu.Item key="34">
                        <Link to="">{t('items.catalog.items.stock')}</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub10"
                    icon={<CustomerServiceOutlined className="sider__menu-icon"/>}
                    title={t('items.customer-service.name')}
                >
                    <Menu.Item key="35">
                        <Link to="">{t('items.customer-service.items.customer-service')}</Link>
                    </Menu.Item>
                    <Menu.Item key="36">
                        <Link to="">{t('items.customer-service.items.order-messages')}</Link>
                    </Menu.Item>
                    <Menu.Item key="37">
                        <Link to="">{t('items.customer-service.items.merchandise-returns')}</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item
                    key="38"
                    icon={<CommentOutlined className="sider__menu-icon"/>}
                >
                    {t('items.comments.name')}
                </Menu.Item>
                <SubMenu
                    key="sub11"
                    icon={<GiftOutlined className="sider__menu-icon"/>}
                    title={t('items.marketing.name')}
                >
                    <Menu.Item key="39">
                        <Link to="">{t('items.marketing.items.coupons')}</Link>
                    </Menu.Item>
                    <Menu.Item key="40">
                        <Link to="">{t('items.marketing.items.newsletter-queue')}</Link>
                    </Menu.Item>
                    <Menu.Item key="41">
                        <Link to="">{t('items.marketing.items.newsletter-subscribers')}</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="aspian-lms"
                            title={<span style={{color: "hsla(0,0%,100%,.2)"}}>{t('sections.lms-section')}</span>}>
                <Menu.Item
                    key="42"
                    icon={<DashboardOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.dashboard.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="43"
                    icon={<CalendarOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.calendar.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="44"
                    icon={<SolutionOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.teachers.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="45"
                    icon={<TeamOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.students.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="46"
                    icon={<ReadOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.courses.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="47"
                    icon={<TrophyOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.badges.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="48"
                    icon={<AuditOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.competencies.name')}</Link>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="aspian-e-health"
                            title={<span style={{color: "hsla(0,0%,100%,.2)"}}>{t('sections.e-health-section')}</span>}>
                <Menu.Item
                    key="49"
                    icon={<DashboardOutlined className="sider__menu-icon"/>}
                >
                    <Link to="/admin">{t('items.dashboard.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="50"
                    icon={<HeartOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.doctors.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="51"
                    icon={<TeamOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.patients.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="52"
                    icon={<HourglassOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.appointments.name')}</Link>
                </Menu.Item>
                <Menu.Item
                    key="53"
                    icon={<ReconciliationOutlined className="sider__menu-icon"/>}
                >
                    <Link to="">{t('items.prescriptions.name')}</Link>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
};

// Redux Dispatch To Map
const mapDispatchToProps = {
    toggle
}

export default withRouter(connect(
    null, mapDispatchToProps
)(AspianMenu));
