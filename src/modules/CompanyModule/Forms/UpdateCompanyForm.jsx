import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Select, Divider, Row, Col, Button, message, Upload } from 'antd';
import { countryList } from '@/utils/countryList';

import { UploadOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import { fetchImage } from '@/request/fetchImage';

export default function CompanyForm({ subTotal = 0, current = null }) {
  const { last_invoice_number } = useSelector(selectFinanceSettings);

  if (last_invoice_number === undefined) {
    return <></>;
  }

  return <LoadCompanyForm subTotal={subTotal} current={current} />;
}

function LoadCompanyForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { last_invoice_number } = useSelector(selectFinanceSettings);
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [lastNumber, setLastNumber] = useState(() => last_invoice_number + 1);
  const [blobImage,setBlobImage] = useState(null)
   const [logoFileList, setLogoFileList] = useState([]);

  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };


  useEffect(() => {
    if (current) {
      const { taxRate = 0, year, number,logo } = current;
      setTaxRate(taxRate / 100);
      setCurrentYear(year);
      setLastNumber(number);
     
    }
  }, [current]); 
 
  useEffect(() => {
    const fetchData = async () => {
      if (current && current.logo?.length>0) {
        try {
          const { imageUrl, type } = await fetchImage({
            entity: 'company',
            imagePath: current.logo,
          });
          console.log("image url is",imageUrl,"type is , ",type)

          // Extract the extension from the MIME type
          const extension = type.split('/')[1];

          // Create a File object with the correct type and extension
          const fileObj = new File([await (await fetch(imageUrl)).blob()], `logo.${extension}`, {
            type,
          });

          setLogoFileList([
            {
              uid: '-1',
              name: `logo.${extension}`,
              status: 'done',
              url: imageUrl,
              originFileObj: fileObj,
            },
          ]);
        } catch (error) {
          console.error('Error fetching image:', error);
          message.error('Failed to fetch image');
        }
      }
    };

    fetchData();
  }, [current]);

    const handleFileListChange = ({ fileList }) => {
      setLogoFileList(fileList);
    };

  useEffect(() => {
    const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)));
    setTotal(Number.parseFloat(currentTotal));
  }, [subTotal, taxRate]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return false;
  };

   const handleLogoChange = (info) => {
     let fileList = [...info.fileList];
     fileList = fileList.slice(-1); // Limit to one file
     setLogoFileList(fileList);
   };
  // const addField = useRef(false);

  // useEffect(() => {
  //   addField.current.click();
  // }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item label={translate('Name')} name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={14}>
          <Form.Item label={translate('Description')} name="description">
            <Input />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            name="file"
            label="Logo"
            valuePropName='blobImage'
           
          >
            <Upload
              beforeUpload={beforeUpload}
              fileList={logoFileList}
              onChange={handleFileListChange}
              listType="picture"
              maxCount={1}
            
            >
              <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            label={translate('phone')}
            name="phone"
            rules={[
              {
                required: true,
                type: 'phone',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            label={translate('email')}
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            label={translate('country')}
            name="country"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
              style={{
                width: '100%',
              }}
            >
              {countryList.map((language) => (
                <Select.Option
                  key={language.value}
                  value={language.value}
                  label={translate(language.label)}
                >
                  {language?.icon && language?.icon + ' '}
                  {translate(language.label)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={4}>
          <Form.Item
            label={translate('annual revenue')}
            name="annualRevenue"
            initialValue={lastNumber}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="creationDate"
            label={translate('creation Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={14}>
          <Form.Item label={translate('Note')} name="notes">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
    </>
  );
}
