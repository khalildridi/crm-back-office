import { Button, Result, Layout, Row, Col, Typography, Card } from 'antd';
import useLanguage from '@/locale/useLanguage';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  const translate = useLanguage();
  return (
    <Layout>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Result
              status="info"
              title={'SHREWD STEWARD CRM'}
              subTitle={translate('Admin Dashboard')}
              extra={<Button type="primary">{translate('Contact Support')}</Button>}
            />
          </Col>
        </Row> */}

        <Row gutter={[16, 16]} style={{ marginTop: '40px' }}>
          <Col span={24}>
            <Card>
              <Title level={3}>{translate('About Us')}</Title>
              <Paragraph>
                {translate(
                  'We are a leading platform for crowdfunding, offering a seamless and efficient way to fund projects and ideas. Our mission is to empower creators and backers alike, fostering innovation and community-driven success.'
                )}
              </Paragraph>
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Title level={3}>{translate('Contact Us')}</Title>
              <Paragraph>{translate('Need assistance? Reach out to our support team:')}</Paragraph>
              <Button
                type="primary"
                href="mailto:support@shrewdstewardcrm.com"
                style={{ margin: '8px' }}
              >
                {translate('Email Support')}
              </Button>
              <Button type="primary" href="tel:+123456789" style={{ margin: '8px' }}>
                {translate('Call Support')}
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        {translate('SHREWD STEWARD CRM ©2024 Created by Your Company')}
      </Footer> */}
    </Layout>
  );
};

export default About;
