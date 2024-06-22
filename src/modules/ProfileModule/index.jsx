import Profile from './components/Profile';
import ProfileLayout from '@/layout/ProfileLayout';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

export default function ProfileModule({ config }) {
  return (
    <ProfileLayout>
      <Layout className="site-layout">
        <Content
          className="whiteBox shadow"
          style={{
            padding: '40px 50px',
            margin: '0px auto',
            width: '100%',
            maxWidth: '1100px',
          }}
        >
          <Profile config={config} />
        </Content>
      </Layout>
    </ProfileLayout>
  );
}
