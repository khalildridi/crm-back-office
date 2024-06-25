import React, { useEffect, useState } from 'react';
import { Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useSelector, useDispatch } from 'react-redux';
import { selectSettings } from '@/redux/settings/selectors';
import { toMediaUrl } from '@/request/checkImage'; // Assurez-vous que le chemin est correct

export default function AppSettingForm() {
  const translate = useLanguage();
  const { result, isLoading } = useSelector(selectSettings);
  const [logoUrl, setLogoUrl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && result && result.company_settings) {
      const logo = result.company_settings.company_logo;
      if (logo) {
        // Construire l'URL de l'image en utilisant toMediaUrl
        const imageUrl = toMediaUrl(logo);
        setLogoUrl(imageUrl);
      }
    }
  }, [result, isLoading, dispatch]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must be smaller than 5MB!');
    }
    return false;
  };

  return (
    <Form>
      <Form.Item
        name="company_logo"
        label="Logo"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload
          beforeUpload={beforeUpload}
          listType="picture"
          accept="image/png, image/jpeg"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
        </Upload>
      </Form.Item>

      {logoUrl && ( // Afficher l'image si l'URL du logo est disponible
        <img src={logoUrl} alt="Company Logo" style={{ maxWidth: '100%', marginTop: '10px' }} />
      )}
    </Form>
  );
}
