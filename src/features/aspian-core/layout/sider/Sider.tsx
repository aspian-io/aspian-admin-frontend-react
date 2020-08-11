import React from 'react';
import { Layout } from 'antd';
import AspianMenu from './menu/Menu';

interface IProps {
  collapsed: boolean;
  onLayoutBreakpoint: (broken:boolean) => void;
}

const { Sider } = Layout;

const AspianSider: React.FC<IProps> = ({ collapsed, onLayoutBreakpoint }) => {

  return (
    <Sider
      className='sider'
      breakpoint="lg"
      collapsedWidth="0"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onBreakpoint= {onLayoutBreakpoint}
    >
      <AspianMenu />
    </Sider>
  );
};

export default AspianSider;
