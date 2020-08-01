import React, { FC, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Layout, ConfigProvider } from 'antd';
import faIR from 'antd/es/locale/fa_IR';

import AspianHeader from '../../features/layout/header/Header';
import AspianContent from '../../features/layout/content/Content';
import AspianSider from '../../features/layout/sider/Sider';
import AspianFooter from '../../features/layout/footer/Footer';

import 'antd/dist/antd.css';
import './styles.css';

const App: FC<WithTranslation> = ({ t }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    // <ConfigProvider direction='rtl' locale={faIR}>
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <AspianSider collapsed={collapsed} />
        <Layout className="site-layout">
          <AspianHeader collapsed={collapsed} toggle={toggle} />
          <AspianContent />
          <AspianFooter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default withTranslation()(App);
