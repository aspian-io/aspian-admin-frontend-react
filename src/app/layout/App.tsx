import React, { FC, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Layout, ConfigProvider, Breadcrumb } from 'antd';
import { observer } from 'mobx-react-lite';
//import faIR from 'antd/es/locale/fa_IR';

import AspianHeader from '../../features/aspian-core/layout/header/Header';
import AspianSider from '../../features/aspian-core/layout/sider/Sider';
import AspianFooter from '../../features/aspian-core/layout/footer/Footer';

import 'antd/dist/antd.css';
import '../../scss/aspian-core/pages/dashboard/_common.scss';
import PostList from '../../features/aspian-core/post/postList/PostList';

const { Content } = Layout;

const App: FC<WithTranslation> = ({ t }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
    if (collapsed) {
      document.getElementById('contentLayout')!.style.marginLeft = '200px';
    } else {
      document.getElementById('contentLayout')!.style.marginLeft = '0';
    }
  };

  const onLayoutBreakpoint = (broken: boolean): void => {
    if (broken) {
      document.getElementById('contentLayout')!.style.marginLeft = '0';
      document.getElementById('appLayout')!.style.overflow = 'hidden';
      document.getElementById('contentLayout')!.style.minWidth = `100%`;
      setCollapsed(true);
    } else {
      document.getElementById('contentLayout')!.style.marginLeft = '200px';
      document.getElementById('appLayout')!.style.overflow = 'initial';
      document.getElementById('contentLayout')!.style.minWidth = `initial`;
      setCollapsed(false);
    }
  };

  return (
    // <ConfigProvider direction='rtl' locale={faIR}>
    <ConfigProvider>
      <Layout className="layout" id="appLayout">
        <AspianSider
          collapsed={collapsed}
          onLayoutBreakpoint={onLayoutBreakpoint}
        />
        <Layout id="contentLayout">
          <AspianHeader collapsed={collapsed} toggle={toggle} />
          <Content
            className="content"
            style={{ margin: '24px 16px 0', overflow: 'initial' }}
          >
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-wrapper">
              <PostList />
            </div>
          </Content>
          <AspianFooter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default withTranslation()(observer(App));
