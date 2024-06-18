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

export default function ErpCrmApp() {
  const { Content } = Layout;
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose, currentApp } = stateApp;
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
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
          <Layout style={{ marginLeft: 0, marginRight: '250px' /* Ajuster pour la sidebar fixe */ }}>
            <HeaderContent />
            <Content
              style={{
                margin: '40px auto 30px',
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
                margin: '40px auto 30px',
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
