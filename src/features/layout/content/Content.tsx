import React from 'react'
import { Layout} from 'antd';
import AspianBreadcrumb from './breadcrumb/Breadcrumb';

const { Content } = Layout;

const AspianContent = () => {
    return (
        <Content style={{ margin: '0 16px' }}>
          <AspianBreadcrumb />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
    )
}

export default AspianContent
