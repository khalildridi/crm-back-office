import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import logoIcon from '@/style/images/logo-icon.svg';

export default function Loading({ isLoading, children }) {
  const antIcon =  <img src={logoIcon} alt="Loading" style={{ width: 48, height: 48 }} />;

  return (
    <Spin indicator={antIcon} spinning={isLoading}>
      {children}
    </Spin>
  );
}
