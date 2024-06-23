import useLanguage from '@/locale/useLanguage';
import CreateInvestorModule from '@/modules/InvestorModule/CreateInvestorModule';

export default function InvestorCreate() {
  const entity = 'investor';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('investor'),
    DATATABLE_TITLE: translate('investor_list'),
    ADD_NEW_ENTITY: translate('add_new_investor'),
    ENTITY_NAME: translate('investor'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateInvestorModule config={configPage} />;
}
