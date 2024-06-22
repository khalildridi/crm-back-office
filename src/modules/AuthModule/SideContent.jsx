import { Space, Layout, Divider, Typography } from 'antd';
import logo from '@/style/images/shrewd.svg';
import backgroundAuth from '@/style/images/background-auth.jpg';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SideContent() {
  const translate = useLanguage();
  const langDirection = useSelector(selectLangDirection)

  return (
    <Content
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url(${backgroundAuth})`,
        backgroundColor: '#cccccc',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        {/* <img
          src={logo}
          alt="Shrewd Steward CRM"
          style={{ margin: '0 auto 40px', display: 'block' }}
          height={"150px"}
          width={"220px"}
        /> */}
        <div className="space50"></div>
      </div>
    </Content>
  );
}
