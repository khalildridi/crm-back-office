import React from 'react';
import { Spin } from 'antd';
import logoIcon from '@/style/images/logo-loading.png';

const PageLoader = () => {
  return (
    <div className="centerAbsolute">
      <img src={logoIcon} alt="Loading" style={{ width: 86, height: 86 }} />
    </div>
  );
};
export default PageLoader;
