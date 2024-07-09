import { Form, Input, Select } from 'antd';
import { UploadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { message, Upload, Button, Switch } from 'antd';

import useLanguage from '@/locale/useLanguage';


export default function RoleForm({ isUpdateForm = false, isForAdminOwner = false }) {
  const translate = useLanguage();
  return (
    <>
    

      <Form.Item
        label={translate('Role')}
        name="role"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value="owner" disabled={!isForAdminOwner}>
            {translate('Account owner')}
          </Select.Option>
          <Select.Option value="admin" disabled={isForAdminOwner}>
            {translate('super_admin')}
          </Select.Option>
          <Select.Option value="manager" disabled={isForAdminOwner}>
            {translate('manager')}
          </Select.Option>
          <Select.Option value="employee" disabled={isForAdminOwner}>
            {translate('employee')}
          </Select.Option>
          <Select.Option value="create_only" disabled={isForAdminOwner}>
            {translate('create_only')}
          </Select.Option>
          <Select.Option value="read_only" disabled={isForAdminOwner}>
            {translate('read_only')}
          </Select.Option>
        </Select>
      </Form.Item>


    </>
  );
}
