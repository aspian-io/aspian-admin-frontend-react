import React from 'react'
import { Layout} from 'antd';
import AspianBreadcrumb from './breadcrumb/Breadcrumb';

const { Content } = Layout;

const AspianContent = () => {
    return (
        <Content className="dashboard__content">
          <AspianBreadcrumb />
          <div
            className="dashboard__content-wrapper"
          >
            Bill is a cat.
          </div>
        </Content>
    )
}

export default AspianContent
