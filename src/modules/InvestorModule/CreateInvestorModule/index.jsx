import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/InvestorPanelModule/CreateItem';
import InvestorForm from '@/modules/InvestorModule/Forms/InvestorForm';

export default function CreateInvestorModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={InvestorForm} />
    </ErpLayout>
  );
}
