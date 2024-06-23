import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { countryList } from '@/utils/countryList';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import ItemRow from '@/modules/ErpPanelModule/ItemRow';
import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import TextArea from 'antd/es/input/TextArea';

export default function InvestorForm({ subTotal = 0, current = null }) {
  const { last_invoice_number } = useSelector(selectFinanceSettings);

  if (last_invoice_number === undefined) {
    return <></>;
  }

  return <LoadInvestorForm subTotal={subTotal} current={current} />;
}

function LoadInvestorForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { last_invoice_number } = useSelector(selectFinanceSettings);
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [lastNumber, setLastNumber] = useState(() => last_invoice_number + 1);

  const handleTaxChange = (value) => {
    setTaxRate(value / 100);
  };

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year, number } = current;
      setTaxRate(taxRate / 100);
      setCurrentYear(year);
      setLastNumber(number);
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)));
    setTotal(Number.parseFloat(currentTotal));
  }, [subTotal, taxRate]);

  const formItems = [
    { label: 'FirstName', name: 'firstname', component: <Input />, span: 6 },
    { label: 'lastName', name: 'lastname', component: <Input />, span: 6 },
    {
      label: 'phone',
      name: 'phone',
      component: <Input />,
      span: 6,
      rules: [{ required: true, type: 'phone' }],
    },
    {
      label: 'email',
      name: 'email',
      component: <Input />,
      span: 6,
      rules: [{ required: true, type: 'email' }],
    },
    {
      label: 'Birthday',
      name: 'birthday',
      component: <DatePicker style={{ width: '100%' }} format={dateFormat} />,
      span: 8,
      rules: [{ required: true, type: 'object' }],
      initialValue: dayjs(),
    },
    {
      label: 'gender',
      name: 'gender',
      component: (
        <Select
          options={[
            { value: 'male', label: translate('Male') },
            { value: 'female', label: translate('Female') },
            { value: 'other', label: translate('Other') },
          ]}
        />
      ),
      span: 8,
      initialValue: 'male',
    },

    {
      label: 'country',
      name: 'country',
      component: (
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
          }
          style={{ width: '100%' }}
        >
          {countryList.map((country) => (
            <Select.Option
              key={country.value}
              value={country.value}
              label={translate(country.label)}
            >
              {country?.icon && country?.icon + ' '}
              {translate(country.label)}
            </Select.Option>
          ))}
        </Select>
      ),
      span: 8,
      rules: [{ required: true }],
    },
    { label: 'city', name: 'city', component: <Input />, span: 7 },
    {
      label: 'postal Code',
      name: 'postalCode',
      component: <InputNumber min={1} style={{ width: '100%' }} />,
      span: 8,
      rules: [{ required: true }],
    },

    { label: 'Bio', name: 'bio', component: <TextArea />, span: 20 },
  ];

  return (
    <>
      <Row gutter={[12, 0]}>
        {formItems.map((item, index) => (
          <Col className="gutter-row" span={item.span} key={index}>
            <Form.Item
              label={translate(item.label)}
              name={item.name}
              rules={item.rules}
              initialValue={item.initialValue}
            >
              {item.component}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Divider dashed />
    </>
  );
}
