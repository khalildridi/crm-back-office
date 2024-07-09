import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';
import { useMoney, useDate } from '@/settings';
import CompanyDataTableModule from '@/modules/CompanyModule/CompanyDataTableModule';
import ImageDisplay from '@/request/ImageDisplay';
import EmptyImageIcon from './EmptyImageIcon';

export default function Company() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'company';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'company',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['annualRevenue'];
  const dataTableColumns = [
    {
      title: translate('Logo'),
      dataIndex: 'logo',
      render: (logo, record) => {
        console.log('logo is', logo, 'entity is', entity);
        return logo ? <ImageDisplay imagePath={logo} entity={entity} /> : <EmptyImageIcon />;
      },
    },
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Country'),
      dataIndex: 'country',
    },
    {
      title: translate('Creation Date'),
      dataIndex: 'createdDate',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Annual Revenue'),
      dataIndex: 'annualRevenue',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (total, record) => {
        return moneyFormatter({ amount: total, currency_code: record.currency });
      },
    },
    {
      title: translate('Created By'),
      dataIndex: ['createdBy', 'name'],
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('company'),
    DATATABLE_TITLE: translate('company_list'),
    ADD_NEW_ENTITY: translate('add_new_company'),
    ENTITY_NAME: translate('company'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <CompanyDataTableModule config={config} />;
}
