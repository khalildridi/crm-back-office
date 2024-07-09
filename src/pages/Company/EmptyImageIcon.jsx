import React from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const EmptyImageIcon = () => {
  return (
    <Tooltip title="Image not available">
      <PictureOutlined style={{ fontSize: 24, color: '#ccc' }} />
    </Tooltip>
  );
};

export default EmptyImageIcon;
