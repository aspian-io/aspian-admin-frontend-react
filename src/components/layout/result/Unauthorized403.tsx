import React from 'react';
import { Result, Button } from 'antd';
import { history } from '../../../index';
import { useTranslation } from 'react-i18next';

function Unauthorized403() {
  const { t } = useTranslation('core_unathorized403Page');

  return (
    <Result
      status="403"
      title={t('title')}
      subTitle={t('subTitle')}
      extra={
        <Button type="primary" onClick={() => history.push('/admin')}>
          {t('btn')}
        </Button>
      }
    />
  );
}

export default Unauthorized403;
