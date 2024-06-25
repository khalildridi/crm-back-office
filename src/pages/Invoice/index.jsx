import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';

import { useMoney, useDate } from '@/settings';
import InvoiceDataTableModule from '@/modules/InvoiceModule/InvoiceDataTableModule';

export default function Invoice() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'investment';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'investor',
    displayLabels: ['email'],
    searchFields: 'email',
  };
  const deleteModalLabels = ['number', 'investor.email'];
  const dataTableColumns = [
  
    {
      title: translate('Investor'),
      dataIndex: ['investor', 'email'],
    },
       {
      title: translate('Company'),
      dataIndex: ['company', 'name'],
    },
    //   {
    //   title: translate('Amount'),
    //   dataIndex: 'amount',
    // },
    {
      title: translate('Investment Date'),
      dataIndex: 'investmentDate',
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
    // {
    //   title: translate('Amount'),
    //   dataIndex: 'amount',
    //   initialValue:0,
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
    //     return moneyFormatter({ amount: amount ?amount:0, currency_code: record.currency });
    //   },
    // },
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
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let tagStatus = tagColor(status);

        return (
          <Tag color={tagStatus.color}>
            {/* {tagStatus.icon + ' '} */}
            {status && translate(tagStatus.label)}
          </Tag>
        );
      },
    },
    {
      title: translate('Payment'),
      dataIndex: 'paymentStatus',
      render: (paymentStatus) => {
        let tagStatus = tagColor(paymentStatus);

        return (
          <Tag color={tagStatus.color}>
            {/* {tagStatus.icon + ' '} */}
            {paymentStatus && translate(paymentStatus)}
          </Tag>
        );
      },
    },
    {
      title: translate('Created By'),
      dataIndex: ['createdBy', 'name'],
    },
  ];

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
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <InvoiceDataTableModule config={config} />;
}
