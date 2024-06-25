import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/InvestorPanelModule';
import useLanguage from '@/locale/useLanguage';
import { CreditCardOutlined } from '@ant-design/icons';

export default function InvestorDataTableModule({ config }) {
  const translate = useLanguage();
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        // extra={[
        //   {
        //     label: translate('Record Payment'),
        //     key: 'recordPayment',
        //     icon: <CreditCardOutlined />,
        //   },
        // ]}
      ></ErpPanel>
    </ErpLayout>
  );
}
