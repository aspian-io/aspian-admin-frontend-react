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
  };

  return (
    // <ConfigProvider direction='rtl' locale={faIR}>
    <ConfigProvider>
      <Layout className="dashboard__layout">
        <AspianSider collapsed={collapsed} />
        <Layout className="site-layout">
          <AspianHeader collapsed={collapsed} toggle={toggle} />
          <Content className="dashboard__content">
            <Breadcrumb className="dashboard__breadcrumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="dashboard__content-wrapper">
              {/* <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                loading = {postStore.loadingInitial}
                dataSource={postStore.posts}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item.title}
                  </List.Item>
                )}
              /> */}
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
