import dayjs from 'dayjs';
import { Switch, Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';

import { useMoney, useDate } from '@/settings';
import InvestorDataTableModule from '@/modules/InvestorModule/InvestorDataTableModule';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function Investor() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'investor';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'people',
    displayLabels: ['email'],
    searchFields: 'email',
  };
  const deleteModalLabels = ['number', 'investor.email'];
  const dataTableColumns = [
    {
      title: translate('First Name'),
      dataIndex: ['firstname'],
    },
    {
      title: translate('Last Name'),
      dataIndex: ['lastname'],
    },
    {
      title: translate('Email'),
      dataIndex: ['email'],
    },
    {
      title: translate('Phone'),
      dataIndex: ['phone'],
    },
    // {
    //   title: translate('Company'),
    //   dataIndex: ['company', 'name'],
    // },
    //   {
    //   title: translate('Amount'),
    //   dataIndex: 'amount',
    // },
    // {
    //   title: translate('Investment Date'),
    //   dataIndex: 'investmentDate',
    //   render: (date) => {
    //     return dayjs(date).format(dateFormat);
    //   },
    // },
    {
      title: translate('Is Active'),
      dataIndex: 'enabled',
      key: 'enabled',
      onCell: (record, rowIndex) => {
        return {
          props: {
            style: {
              width: '60px',
            },
          },
        };
      },
      render: (_, record) => {
        return (
          <Switch
            checked={record.enabled}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
    {
      title: translate('created Date'),
      dataIndex: 'created',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
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
    // {
    //   title: translate('Enabled'),
    //   dataIndex: 'enabled',
    //   render: (enabled) => {
    //     let tagStatus = tagColor(enabled);

    //     return (
    //       <Tag color={tagStatus.color}>
    //         {/* {tagStatus.icon + ' '} */}
    //         {enabled && translate(tagStatus.label)}
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
    // {
    //   title: translate('Created Date'),
    //   dataIndex: ['created'],
    // },
  ];

  const Labels = {
    PANEL_TITLE: translate('investor'),
    DATATABLE_TITLE: translate('investor_list'),
    ADD_NEW_ENTITY: translate('add_new_investor'),
    ENTITY_NAME: translate('investor'),

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

  return <InvestorDataTableModule config={config} />;
}
