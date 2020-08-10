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
      className="dashboard__header"
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'dashboard__header--trigger',
        onClick: () => toggle(),
      })}
    </Header>
  );
};

export default AspianHeader;
