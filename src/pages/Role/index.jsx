import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';
import { useMoney, useDate } from '@/settings';
import RoleDataTableModule from '@/modules/RoleModule/RoleDataTableModule';
import ImageDisplay from '@/request/ImageDisplay';

export default function Role() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'role';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'role',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['annualRevenue'];
  const dataTableColumns = [
    // {
    //   title: translate('Logo'),
    //   dataIndex: 'logo',
    //   render: (logo, record) => {
    //     console.log("logo is",logo,"entity is",entity)
    //     return <ImageDisplay imagePath={logo} entity={entity} />;
    //   },
    // },
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    // {
    //   title: translate('Country'),
    //   dataIndex: 'country',
    // },
    // {
    //   title: translate('Creation Date'),
    //   dataIndex: 'createdDate',
    //   render: (date) => {
    //     return dayjs(date).format(dateFormat);
    //   },
    // },
    // {
    //   title: translate('Annual Revenue'),
    //   dataIndex: 'annualRevenue',
    //   onCell: () => {
    //     return {
    //       style: {
    //         textAlign: 'right',
    //         whiteSpace: 'nowrap',
    //         direction: 'ltr',
    //       },
    //     };
    //   },
    //   render: (total, record) => {
    //     return moneyFormatter({ amount: total, currency_code: record.currency });
    //   },
    // },
    {
      title: translate('Created By'),
      dataIndex: ['createdBy', 'name'],
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('role'),
    DATATABLE_TITLE: translate('role_list'),
    ADD_NEW_ENTITY: translate('add_new_role'),
    ENTITY_NAME: translate('role'),
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

  return <RoleDataTableModule config={config} />;
}
