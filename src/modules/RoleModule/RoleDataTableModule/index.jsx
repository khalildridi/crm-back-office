import { ErpLayout } from '@/layout';
import RolePanel from '@/modules/RolePanelModule';
import useLanguage from '@/locale/useLanguage';
import { CreditCardOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';

export default function RoleDataTableModule({ config }) {
  const translate = useLanguage();
  const dispatch = useDispatch();

  return (
    <ErpLayout>
      <RolePanel
        config={config}
        extra={[
          {
            label: translate('Record Payment'),
            key: 'recordPayment',
            icon: <CreditCardOutlined />,
          },
        ]}
      ></RolePanel>
    </ErpLayout>
  );
}
