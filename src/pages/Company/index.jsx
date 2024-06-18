// import CrudModule from '@/modules/CrudModule/CrudModule';
// import DynamicForm from '@/forms/DynamicForm';
// import { fields } from './config';

// import useLanguage from '@/locale/useLanguage';

// export default function Company() {
//   const translate = useLanguage();
//   const entity = 'company';
//   const searchConfig = {
//     displayLabels: ['name'],
//     searchFields: 'name,phone,eamil',
//   };
//   const deleteModalLabels = ['name'];

//   const Labels = {
//     PANEL_TITLE: translate('company'),
//     DATATABLE_TITLE: translate('company_list'),
//     ADD_NEW_ENTITY: translate('add_new_company'),
//     ENTITY_NAME: translate('company'),
//   };
//   const configPage = {
//     entity,
//     ...Labels,
//   };
//   const config = {
//     ...configPage,
//     fields,
//     searchConfig,
//     deleteModalLabels,
//   };
//   return (
//     <CrudModule
//       createForm={<DynamicForm fields={fields} />}
//       updateForm={<DynamicForm fields={fields} />}
//       config={config}
//       // withUpload={true}
//     />
//   );
// }
import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';

import { useMoney, useDate } from '@/settings';
import CompanyDataTableModule from '@/modules/CompanyModule/CompanyDataTableModule';

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
  const deleteModalLabels = ['number', 'client.name'];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
       {
      title: translate('Country'),
      dataIndex: 'country',
    },
 
    // {
    //   title: translate('Client'),
    //   dataIndex: ['client', 'name'],
    // },
    {
      title: translate('Creation Date'),
      dataIndex: 'createdDate',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    // {
    //   title: translate('expired Date'),
    //   dataIndex: 'expiredDate',
    //   render: (date) => {
    //     return dayjs(date).format(dateFormat);
    //   },
    // },
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
    // {
    //   title: translate('paid'),
    //   dataIndex: 'credit',
    //   onCell: () => {
    //     return {
    //       style: {
    //         textAlign: 'right',
    //         whiteSpace: 'nowrap',
    //         direction: 'ltr',
    //       },
    //     };
    //   },
    //   render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    // },
    // {
    //   title: translate('Status'),
    //   dataIndex: 'status',
    //   render: (status) => {
    //     let tagStatus = tagColor(status);

    //     return (
    //       <Tag color={tagStatus.color}>
    //         {/* {tagStatus.icon + ' '} */}
    //         {status && translate(tagStatus.label)}
    //       </Tag>
    //     );
    //   },
    // },
    // {
    //   title: translate('Payment'),
    //   dataIndex: 'paymentStatus',
    //   render: (paymentStatus) => {
    //     let tagStatus = tagColor(paymentStatus);

    //     return (
    //       <Tag color={tagStatus.color}>
    //         {/* {tagStatus.icon + ' '} */}
    //         {paymentStatus && translate(paymentStatus)}
    //       </Tag>
    //     );
    //   },
    // },
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

    // RECORD_ENTITY: translate('record_payment'),
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
