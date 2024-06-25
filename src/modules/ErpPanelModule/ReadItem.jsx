import { useState, useEffect } from 'react';
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
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import { tagColor } from '@/utils/statusTagColor';
const { TabPane } = Tabs;
const { Title } = Typography;

const Item = ({ item, currentErp }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price, currency_code: currentErp.currency })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total, currency_code: currentErp.currency })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });

  const { result: currentResult } = useSelector(selectCurrentItem);
  console.log('result is',currentResult)

  const resetErp = {
    status: '',
    investor: {
      firstName: '',
      email: '',
      phone: '',
      country: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  const [client, setClient] = useState({});
   const [investor, setInvestor] = useState({});

  useEffect(() => {
    if (currentResult) {
      console.log("current result is",currentResult)
      const { items, investment, ...others } = currentResult;

      if (items) {
        setItemsList(items);
      
      }
        setCurrentErp(currentResult);
      //  else 
      // if (investment?.items) {
      //   setItemsList(investment.items);
      //   setCurrentErp({ ...investment.items, ...others, ...invoice });
      // }
    }
    return () => {
      setItemsList([]);
      setCurrentErp(resetErp);
    };
  }, [currentResult]);

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client[currentErp.client.type]);
    }
      if (currentErp?.investor) {
        setInvestor(currentErp.investor[currentErp.investor]);
      }
  }, [currentErp]);

  console.log('current erp now',currentErp)
          const investmentDate = currentErp.investmentDate
            ? new Date(currentErp.investmentDate)
            : null;
          const investmentDateFormatted =
            investmentDate instanceof Date && !isNaN(investmentDate)
              ? investmentDate.toISOString().substring(0, 10)
              : '';

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        // ${currentErp.amount}/
        title={`${ENTITY_NAME} # ${investmentDateFormatted}`}
        ghost={false}
        tags={[
          <Tag color={tagColor(currentErp.status)?.color} key="status">
            {currentErp.status && translate(currentErp.status)}
          </Tag>,
          currentErp.paymentStatus && (
            <Tag color={tagColor(currentErp.paymentStatus)?.color} key="paymentStatus">
              {currentErp.paymentStatus && translate(currentErp.paymentStatus)}
            </Tag>
          ),
        ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            loading={mailInProgress}
            onClick={() => {
              send(currentErp._id);
            }}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.convert({ entity, id: currentErp._id }));
            }}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
          </Button>,

          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        <Row>
          <Statistic title="Status" value={currentErp.status} />
          <Statistic
            title={translate('SubTotal')}
            value={moneyFormatter({
              amount: currentErp.amount,
              currency_code: currentErp.currency,
            })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Total')}
            value={moneyFormatter({
              amount: currentErp.amount,
              currency_code: currentErp.currency,
            })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Paid')}
            value={moneyFormatter({
              amount: currentErp.credit,
              currency_code: currentErp.currency,
            })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined style={{ marginRight: '4px' }} />
              {translate('Investor Information')}
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
              {currentErp.investor.firstname}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <UserOutlined /> {translate('Last Name')}
                </>
              }
            >
              {currentErp.investor.lastname}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined /> {translate('Phone')}
                </>
              }
            >
              {currentErp.investor.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <MailOutlined /> {translate('Email')}
                </>
              }
            >
              {currentErp.investor.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> {translate('Country')}
                </>
              }
            >
              {currentErp.investor.country}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> {translate('City')}
                </>
              }
            >
              {currentErp.investor.city}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <BarcodeOutlined /> {translate('Postal Code')}
                </>
              }
            >
              {currentErp.investor.postalCode}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined style={{ marginRight: '4px' }} />
              {translate('Company Information')}
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
                  <UserOutlined /> {translate('Company Name')}
                </>
              }
            >
              {currentErp.company.name}
            </Descriptions.Item>
            {/* <Descriptions.Item
              label={
                <>
                  <UserOutlined /> {translate('Description')}
                </>
              }
            >
              {currentErp.company.description}
            </Descriptions.Item> */}
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined /> {translate('Phone')}
                </>
              }
            >
              {currentErp.company.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <MailOutlined /> {translate('Email')}
                </>
              }
            >
              {currentErp.company.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> {translate('Country')}
                </>
              }
            >
              {currentErp.company.country}
            </Descriptions.Item>
            {/* <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> {translate('City')}
                </>
              }
            >
              {currentErp.investor.city}
            </Descriptions.Item> */}
            {/* <Descriptions.Item
              label={
                <>
                  <BarcodeOutlined /> {translate('Postal Code')}
                </>
              }
            >
              {currentErp.investor.postalCode}
            </Descriptions.Item> */}
          </Descriptions>
        </TabPane>
      </Tabs>

      <Divider dashed />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <p>
            <strong>{translate('Investment Details :')}</strong>
          </p>
        </Col>
      </Row>
      <Descriptions
        bordered
        column={1}
        size="small"
        layout="horizontal"
        labelStyle={{ fontWeight: 'bold', backgroundColor: '#fff', color: '#000' }}
        contentStyle={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}
      >
        <Descriptions.Item label={translate('Duration')}>{currentErp.duration}</Descriptions.Item>
        <Descriptions.Item label={translate('Interest Rate')}>
          {currentErp.interestRate}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Currency')}>{currentErp.currency}</Descriptions.Item>
        <Descriptions.Item label={translate('Approved')}>
          {currentErp.approved ? translate('Yes') : translate('No')}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Notes')}>{currentErp.notes}</Descriptions.Item>
        <Descriptions.Item label={translate('Created')}>
          {new Date(currentErp.created).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Updated')}>
          {new Date(currentErp.updated).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>

      {/* {itemslist.map((item) => (
        <Item key={item._id} item={item} currentErp={currentErp}></Item>
      ))} */}
      {/* <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>{translate('Sub Total')} :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>
              {moneyFormatter({ amount: currentErp.subTotal, currency_code: currentErp.currency })}
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {translate('Tax Total')} ({currentErp.taxRate} %) :
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {moneyFormatter({ amount: currentErp.taxTotal, currency_code: currentErp.currency })}
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{translate('Total')} :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {moneyFormatter({ amount: currentErp.total, currency_code: currentErp.currency })}
            </p>
          </Col>
        </Row>
      </div> */}
    </>
  );
}
