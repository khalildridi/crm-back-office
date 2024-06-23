import useLanguage from '@/locale/useLanguage';
import CreateCompanyModule from '@/modules/CompanyModule/CreateCompanyModule';

export default function CompanyCreate() {
  const entity = 'company';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('company'),
    DATATABLE_TITLE: translate('company_list'),
    ADD_NEW_ENTITY: translate('add_new_company'),
    ENTITY_NAME: translate('company'),

    // RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateCompanyModule config={configPage} />;
}
