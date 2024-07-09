import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-icon.svg';
import logoIconJpg from "@/style/images/long-logo.jpg"
import logoText from '@/style/images/logo-text.svg';

import useResponsive from '@/hooks/useResponsive';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  InfoCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));
    const currentAdmin = useSelector(selectCurrentAdmin);
    const permissions = currentAdmin.role?.permissions;

  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    // {
    //   key: 'customer',
    //   icon: <CustomerServiceOutlined />,
    //   label: <Link to={'/customer'}>{translate('customers')}</Link>,
    // },
    // {
    //   key: 'people',
    //   icon: <UserOutlined />,
    //   label: <Link to={'/people'}>{translate('peoples')}</Link>,
    // },
    {
      key: 'investor',
      icon: <UserOutlined />,
      label: <Link to={'/investor'}>{translate('investors')}</Link>,
    },
    {
      key: 'company',
      icon: <ShopOutlined />,
      label: <Link to={'/company'}>{translate('companies')}</Link>,
      // children: [
      //   {
      //     key: 'companyList',
      //     label: <Link to={'/company'}>{translate('companies List')}</Link>,
      //   },
      //   {
      //     key: 'addCompany',
      //     label: <Link to={'/company/create'}>{translate('addCompany')}</Link>,
      //   },
      // ],
    },
    // {
    //   key: 'lead',
    //   icon: <FilterOutlined />,
    //   label: <Link to={'/lead'}>{translate('leads')}</Link>,
    // },
    // {
    //   key: 'offer',
    //   icon: <FileOutlined />,
    //   label: <Link to={'/offer'}>{translate('offers')}</Link>,
    // },
    {
      key: 'invoice',
      icon: <ContainerOutlined />,
      label: <Link to={'/investment'}>{translate('invoices')}</Link>,
    },
    // {
    //   key: 'quote',
    //   icon: <FileSyncOutlined />,
    //   label: <Link to={'/quote'}>{translate('proforma invoices')}</Link>,
    // },
    {
      key: 'payment',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payment'}>{translate('payments')}</Link>,
    },

    // {
    //   key: 'product',
    //   icon: <TagOutlined />,
    //   label: <Link to={'/product'}>{translate('products')}</Link>,
    // },
    // {
    //   key: 'categoryproduct',
    //   icon: <TagsOutlined />,
    //   label: <Link to={'/category/product'}>{translate('products_category')}</Link>,
    // },
    // {
    //   key: 'expenses',
    //   icon: <WalletOutlined />,
    //   label: <Link to={'/expenses'}>{translate('expenses')}</Link>,
    // },
    // {
    //   key: 'expensesCategory',
    //   icon: <ReconciliationOutlined />,
    //   label: <Link to={'/category/expenses'}>{translate('expenses_Category')}</Link>,
    // },
    {
      label: translate('Settings'),
      key: 'settings',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'generalSettings',
          label: <Link to={'/settings'}>{translate('settings')}</Link>,
        },
        {
          key: 'admin',
          label: <Link to={'/admin'}>{translate('Admin')}</Link>,
        },
        {
          key: 'role',
          label: <Link to={'/role'}>{translate('Role')}</Link>,
        },

        {
          key: 'paymentMode',
          label: <Link to={'/payment/mode'}>{translate('payments_mode')}</Link>,
        },
        // {
        //   key: 'taxes',
        //   label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
        // },
      ],
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: <Link to={'/about'}>{translate('about')}</Link>,
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        direction: langDirection,
        position: isMobile ? 'absolute' : 'relative',
        top: '0px',
        left: '0px',
        ...(!isMobile && {
          background: 'none',
          border: 'none',
          top: '0px',
          borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
        }}
      >

        {!showLogoApp && (
            <img src={logoIconJpg} alt="Logo" style={{ width:"100%" }} />
          // <img
          //   src={logoText}
          //   alt="Logo"
          //   style={{
          //     marginTop: '3px',
          //     marginLeft: '10px',
          //     height: '38px',
          //   }}
          // />
        )}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          background: 'none',
          border: 'none',
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ [langDirection === 'rtl' ? 'marginRight' : 'marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement={langDirection === 'rtl' ? 'right' : 'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
