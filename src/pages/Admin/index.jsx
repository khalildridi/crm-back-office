import React from 'react';

import useLanguage from '@/locale/useLanguage';

import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule/CrudModule';
import PaymentModeForm from '@/forms/PaymentModeForm';
import AdminForm from '@/forms/AdminForm';

export default function Admin() {
  const translate = useLanguage();
  const entity = 'admin';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const deleteModalLabels = ['name'];

  const readColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
      {
      title: translate('Surname'),
      dataIndex: 'surname',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    // {
    //   title: translate('Default'),
    //   dataIndex: 'isDefault',
    // },
    {
      title: translate('enabled'),
      dataIndex: 'enabled',
    },
  ];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
      {
      title: translate('SurName'),
      dataIndex: 'surname',
    },
        {
      title: translate('Role'),
      dataIndex: 'role',
    },
    // {
    //   title: translate('Phone'),
    //   dataIndex: 'phone',
    // },
    // {
    //   title: translate('Default'),
    //   dataIndex: 'isDefault',
    //   key: 'isDefault',
    //   onCell: (record, rowIndex) => {
    //     return {
    //       props: {
    //         style: {
    //           width: '60px',
    //         },
    //       },
    //     };
    //   },
    //   render: (_, record) => {
    //     return (
    //       <Switch
    //         checked={record.isDefault}
    //         checkedChildren={<CheckOutlined />}
    //         unCheckedChildren={<CloseOutlined />}
    //       />
    //     );
    //   },
    // },
    {
      title: translate('enabled'),
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
  ];

  const Labels = {
    PANEL_TITLE: translate('admin'),
    DATATABLE_TITLE: translate('admin_list'),
    ADD_NEW_ENTITY: translate('add_new_admin'),
    ENTITY_NAME: translate('admin'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<AdminForm />}
      updateForm={<AdminForm isUpdateForm={true} />}
      config={config}
    />
  );
}
