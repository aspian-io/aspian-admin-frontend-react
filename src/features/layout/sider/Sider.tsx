import React from 'react';
import { Layout } from 'antd';
import AspianMenu from './menu/Menu';

interface IProps {
  collapsed: boolean;
}

const { Sider } = Layout;

const AspianSider: React.FC<IProps> = ({ collapsed }) => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <AspianMenu />
    </Sider>
  );
};

export default AspianSider;
