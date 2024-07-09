import { useState, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Descriptions,
  Statistic,
  Tag,
  Collapse,
  Checkbox,
  Divider,
  Typography,
} from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
  InfoCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  BarcodeOutlined,
  ProfileOutlined,
  CalendarOutlined,
  ManOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { generate as uniqueId } from 'shortid';
import { selectCurrentItem } from '@/redux/erp/selectors';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import { tagColor } from '@/utils/statusTagColor';

const { Title } = Typography;
const { Panel } = Collapse;

const permissionsByModule = {
  companies: ['view_company', 'create_company', 'update_company', 'delete_company'],
  investors: ['view_investor', 'create_investor', 'update_investor', 'delete_investor'],
  investments: ['view_investment', 'create_investment', 'update_investment', 'delete_investment'],
  settings: ['view_setting', 'create_setting', 'update_setting', 'delete_setting'],
  // Ajoutez d'autres modules et leurs permissions ici
};

const ReadItem = ({ config, selectedItem }) => {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });
  const { result: currentResult } = useSelector(selectCurrentItem);

  const resetErp = {
    status: '',
    name: '',
    phone: '',
    email: '',
    country: '',
    enabled: false,
    created: '',
    permissions: [],
  };

  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);

  useEffect(() => {
    if (currentResult) {
      setCurrentErp(currentResult);
    }
    return () => {
      setCurrentErp(resetErp);
    };
  }, [currentResult]);

  const createdDate = currentErp.created ? new Date(currentErp.created) : null;
  const createdDateFormatted =
    createdDate instanceof Date && !isNaN(createdDate)
      ? createdDate.toISOString().substring(0, 10)
      : '';

  const renderCheckboxes = (permissions) => {
    return permissions.map((permission) => (
      <Checkbox key={permission} checked={currentErp.permissions.includes(permission)}>
        {permission.replace(/_/g, ' ')}
      </Checkbox>
    ));
  };

  return (
    <>
      <PageHeader
        onBack={() => navigate(`/${entity.toLowerCase()}`)}
        title={<Title level={3}>{`${ENTITY_NAME} #`}</Title>}
        ghost={false}
        tags={[
          <Tag color={tagColor(currentErp.status)?.color} key="status">
            {currentErp.status && translate(currentErp.status)}
          </Tag>,
          currentErp.enabled && (
            <Tag color="green" key="enabled">
              {translate('Enabled')}
            </Tag>
          ),
        ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          // <Button
          //   key={`${uniqueId()}`}
          //   onClick={() =>
          //     window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`, '_blank')
          //   }
          //   icon={<FilePdfOutlined />}
          // >
          //   {translate('Download PDF')}
          // </Button>,
          // <Button
          //   key={`${uniqueId()}`}
          //   loading={mailInProgress}
          //   onClick={() => send(currentErp._id)}
          //   icon={<MailOutlined />}
          // >
          //   {translate('Send by Email')}
          // </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => dispatch(erp.convert({ entity, id: currentErp._id }))}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.currentAction({ actionType: 'update', data: currentErp }));
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{ padding: '20px 0px' }}
      >
        {/* <Row gutter={[32, 32]}>
          <Col span={8}>
            <Statistic title={translate('Created Date')} value={createdDateFormatted} />
          </Col>
          <Col span={8}>
            <Statistic title={translate('Country')} value={currentErp.country} />
          </Col>
          <Col span={8}>
            <Statistic
              title={translate('Enabled')}
              value={currentErp.enabled ? translate('Yes') : translate('No')}
            />
          </Col>
        </Row> */}
      </PageHeader>
      <Divider dashed />
      <Descriptions
        bordered
        column={1}
        size="small"
        layout="horizontal"
        labelStyle={{ fontWeight: 'bold', backgroundColor: '#fff', color: '#000' }}
        contentStyle={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}
      >
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> {translate('Name')}
            </>
          }
        >
          {currentErp.name}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Descriptions
        bordered
        column={1}
        size="small"
        layout="horizontal"
        labelStyle={{ fontWeight: 'bold', backgroundColor: '#fff', color: '#000' }}
        contentStyle={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}
      >
          <Descriptions.Item
          label={
            <>
              <SecurityScanOutlined /> {translate('Permissions')}
            </>
          }
        ></Descriptions.Item>
        </Descriptions>
      <Collapse accordion>
        {Object.keys(permissionsByModule).map((module) => (
          <Panel header={module.charAt(0).toUpperCase() + module.slice(1)} key={module}>
            {renderCheckboxes(permissionsByModule[module])}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default ReadItem;
