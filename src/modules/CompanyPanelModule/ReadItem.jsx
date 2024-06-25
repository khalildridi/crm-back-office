import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
import {
  Button,
  Row,
  Col,
  Descriptions,
  Statistic,
  Tag,
  Card,
  Tabs,
  Space,
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

const { TabPane } = Tabs;
const { Title } = Typography;

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
    // lastname: '',
    phone: '',
    email: '',
    country: '',
    // city: '',
    enabled: false,
    created: '',
    // bio: '',
    // birthday: '',
    // gender: '',
    // postalCode: '',
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

  const investmentDate = currentErp.created ? new Date(currentErp.created) : null;
  const birthday = currentErp.birthday ? new Date(currentErp.birthday) : null;
   const birthdayFormatted =
     birthday instanceof Date && !isNaN(birthday) ? birthday.toISOString().substring(0, 10) : '';
  const investmentDateFormatted =
    investmentDate instanceof Date && !isNaN(investmentDate)
      ? investmentDate.toISOString().substring(0, 10)
      : '';

  return (
    <>
      <PageHeader
        onBack={() => navigate(`/${entity.toLowerCase()}`)}
        title={<Title level={3}>{`${ENTITY_NAME} # ${investmentDateFormatted}`}</Title>}
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
          <Button
            key={`${uniqueId()}`}
            onClick={() =>
              window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`, '_blank')
            }
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            loading={mailInProgress}
            onClick={() => send(currentErp._id)}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
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
        <Row gutter={[32, 32]}>
          {/* <Col span={6}>
            <Statistic title="Status" value={currentErp.status} />
          </Col> */}
          <Col span={8}>
            <Statistic title={translate('Created Date')} value={investmentDateFormatted} />
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
        </Row>
      </PageHeader>
      <Divider dashed />
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined style={{ marginRight: '4px' }} />
              {translate('Basic Information')}
            </span>
          }
          key="1"
        >
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
                  <UserOutlined /> {translate('First Name')}
                </>
              }
            >
              {currentErp.firstname}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <UserOutlined /> {translate('Last Name')}
                </>
              }
            >
              {currentErp.lastname}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined /> {translate('Phone')}
                </>
              }
            >
              {currentErp.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <MailOutlined /> {translate('Email')}
                </>
              }
            >
              {currentErp.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> {translate('Country')}
                </>
              }
            >
              {currentErp.country}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> {translate('City')}
                </>
              }
            >
              {currentErp.city}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <BarcodeOutlined /> {translate('Postal Code')}
                </>
              }
            >
              {currentErp.postalCode}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined style={{ marginRight: '4px' }} />
              {translate('Detailed Information')}
            </span>
          }
          key="2"
        >
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
                  <ProfileOutlined /> {translate('Bio')}
                </>
              }
            >
              {currentErp.bio}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <CalendarOutlined /> {translate('Birthday')}
                </>
              }
            >
              {birthdayFormatted}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <ManOutlined /> {translate('Gender')}
                </>
              }
            >
              {currentErp.gender === 'male' ? translate('Male') : translate('Female')}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </>
  );
};

export default ReadItem;
