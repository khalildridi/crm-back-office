import { useEffect, useState } from 'react';
import { Form, Row, Col, Select, Checkbox, Input } from 'antd';
import { roleList } from '@/utils/roleList';
import useLanguage from '@/locale/useLanguage';

const modules = [
  {
    name: 'investment',
    permissions: ['view', 'create', 'edit', 'delete'],
  },
  {
    name: 'investor',
    permissions: ['view', 'create', 'edit', 'delete'],
  },
  {
    name: 'company',
    permissions: ['view', 'create', 'edit', 'delete'],
  },
];

const generatePermissions = (module, permissions) => {
  return permissions.map((permission) => `${permission}_${module}`);
};

export default function RoleForm({ subTotal = 0, current = null }) {
  return <LoadRoleForm subTotal={subTotal} current={current} />;
}

function LoadRoleForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const isModuleChecked = (module) => {
    const modulePermissions = generatePermissions(module.name, module.permissions);
    return modulePermissions.every((permission) => selectedPermissions.includes(permission));
  };

  const handleModuleChange = (module, checked) => {
    const modulePermissions = generatePermissions(module.name, module.permissions);
    setSelectedPermissions((prev) =>
      checked
        ? [...prev, ...modulePermissions]
        : prev.filter((permission) => !modulePermissions.includes(permission))
    );
  };

  const handlePermissionChange = (permission, checked) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, permission] : prev.filter((item) => item !== permission)
    );
  };
  useEffect(() => {
    console.log('selected permissions is', selectedPermissions);
  }, [selectedPermissions]);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={21}>
          <Form.Item label={translate('Role')} name="name" rules={[{ required: true }]}>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .startsWith((optionB?.label ?? '').toLowerCase())
              }
              style={{ width: '100%' }}
            >
              {roleList.map((role) => (
                <Select.Option key={role.value} value={role.value} label={translate(role.label)}>
                  {translate(role.label)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={24}>
          <Form.Item label={translate('Permissions')} name="permissions">
            <div>
              {modules.map((module) => (
                <div key={module.name}>
                  <Checkbox
                    checked={isModuleChecked(module)}
                    onChange={(e) => handleModuleChange(module, e.target.checked)}
                  >
                    {translate(module.name)}
                  </Checkbox>
                  <Row>
                    {module.permissions.map((permission) => {
                      const permissionKey = `${permission}_${module.name}`;
                      return (
                        <Col key={permissionKey} span={6}>
                          <Checkbox
                            checked={selectedPermissions.includes(permissionKey)}
                            onChange={(e) =>
                              handlePermissionChange(permissionKey, e.target.checked)
                            }
                          >
                            {translate(permission)}
                          </Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              ))}
            </div>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
