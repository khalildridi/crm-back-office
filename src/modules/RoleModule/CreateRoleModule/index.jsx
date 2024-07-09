import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/RolePanelModule/CreateItem';
import RoleForm from '@/modules/RoleModule/Forms/RoleForm';

export default function CreateRoleModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={RoleForm} />
    </ErpLayout>
  );
}
