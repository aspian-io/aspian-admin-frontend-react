import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

interface IProps {
  collapsed: boolean;
  toggle: () => void;
}

const { Header } = Layout;

const AspianHeader: React.FC<IProps> = ({ collapsed, toggle }) => {
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: '#fff' }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => toggle(),
      })}
    </Header>
  );
};

export default AspianHeader;
