import useLanguage from '@/locale/useLanguage';
import CreateInvoiceModule from '@/modules/InvoiceModule/CreateInvoiceModule';

export default function InvoiceCreate() {
  const entity = 'investment';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('investment'),
    DATATABLE_TITLE: translate('investment_list'),
    ADD_NEW_ENTITY: translate('add_new_investment'),
    ENTITY_NAME: translate('investment'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateInvoiceModule config={configPage} />;
}
