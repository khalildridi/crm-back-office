import useLanguage from '@/locale/useLanguage';
import UpdateRoleModule from '@/modules/RoleModule/UpdateRoleModule';

export default function RoleUpdate() {
  const entity = 'role';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('role'),
    DATATABLE_TITLE: translate('role_list'),
    ADD_NEW_ENTITY: translate('add_new_role'),
    ENTITY_NAME: translate('role'),

    // RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <UpdateRoleModule config={configPage} />;
}
