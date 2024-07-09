import { useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import { useAppContext } from '@/context/appContext';
import Navigation from '@/apps/Navigation/NavigationContainer';
import HeaderContent from '@/apps/Header/HeaderContainer';
import PageLoader from '@/components/PageLoader';
import { settingsAction } from '@/redux/settings/actions';
import { translateAction } from '@/redux/translate/actions';
import { selectAppSettings, selectSettings } from '@/redux/settings/selectors';
import AppRouter from '@/router/AppRouter';
import useResponsive from '@/hooks/useResponsive';
import storePersist from '@/redux/storePersist';
import { selectLangDirection } from '@/redux/translate/selectors';
import './styles.css'; // Assurez-vous d'importer vos styles CSS
import { selectCurrentAdmin } from '@/redux/auth/selectors';

export default function ErpCrmApp() {
  const { Content } = Layout;
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose, currentApp } = stateApp;
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const auth = JSON.parse(window.localStorage.getItem('auth'));
  const access_token = auth ? auth.access_token : null;
  console.log("auth is ",auth)
  useLayoutEffect(() => {
  
    if(access_token!==null)  {
        console.log('i wanna list settings');
      dispatch(settingsAction.list({ entity: 'setting' }));
    }

  }, [dispatch]);

  const appSettings = useSelector(selectAppSettings);

  const { isSuccess: settingIsloaded } = useSelector(selectSettings);

  useEffect(() => {
    const { loadDefaultLang } = storePersist.get('firstVisit');
    if (appSettings.idurar_app_language && !loadDefaultLang) {
      dispatch(translateAction.translate(appSettings.idurar_app_language));
      window.localStorage.setItem('firstVisit', JSON.stringify({ loadDefaultLang: true }));
    }
  }, [appSettings, dispatch]);

  const langDirection = useSelector(selectLangDirection);

  if (settingIsloaded)
    return (
      <Layout hasSider style={{ flexDirection: langDirection === 'rtl' ? 'row-reverse' : 'row' }}>
        <div className="fixed-sidebar">
          <Navigation />
        </div>

        {isMobile ? (
          <Layout style={{ marginLeft: 0, marginRight: 0 }}>
            <HeaderContent />
            <Content
              style={{
                margin: '0 auto',
                overflow: 'initial',
                width: '100%',
                padding: '0 25px',
                maxWidth: 'none',
              }}
            >
              <AppRouter />
            </Content>
          </Layout>
        ) : (
          <Layout style={{ marginLeft: '250px' /* Ajuster pour la sidebar fixe */ }}>
            <HeaderContent />
            <Content
              style={{
                margin: '0px auto',
                overflow: 'initial',
                width: '100%',
                padding: '0 50px',
                maxWidth: 1400,
              }}
            >
              <AppRouter />
            </Content>
          </Layout>
        )}
      </Layout>
    );
  else return <PageLoader />;
}
