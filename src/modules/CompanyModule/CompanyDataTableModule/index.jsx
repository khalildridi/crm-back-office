import { ErpLayout } from '@/layout';
import CompanyPanel from '@/modules/CompanyPanelModule';
import useLanguage from '@/locale/useLanguage';
import { CreditCardOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';

export default function CompanyDataTableModule({ config }) {
  const translate = useLanguage();
  const dispatch = useDispatch();

  return (
    <ErpLayout>
      <CompanyPanel
        config={config}
        extra={[
          {
            label: translate('Record Payment'),
            key: 'recordPayment',
            icon: <CreditCardOutlined />,
          },
        ]}
      ></CompanyPanel>
    </ErpLayout>
  );
}
