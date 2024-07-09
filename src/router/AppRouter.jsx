import { lazy, useEffect } from 'react';

import {} from 'react-router-dom';
import {} from 'react-router-dom';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { useAppContext } from '@/context/appContext';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

import routes from './routes';
import { useSelector } from 'react-redux';

export default function AppRouter() {
  let location = useLocation();
  const { state: stateApp, appContextAction } = useAppContext();
  const { app } = appContextAction;
  const currentAdmin = useSelector(selectCurrentAdmin)
  const permissions = currentAdmin.role?.permissions;

  const routesList = [];

  Object.entries(routes).forEach(([key, value]) => {
    routesList.push(...value);
  });

  function getAppNameByPath(path) {
    for (let key in routes) {
      for (let i = 0; i < routes[key].length; i++) {
        // l'access est dans routes[key][i].access
          if (routes[key][i].path === path) {
            console.log("key is",key)
            return key;
          }
      }
    }
    // Return 'default' app  if the path is not found
    return 'default';
  }
  useEffect(() => {
    if (location.pathname === '/') {
      app.default();
    } else {
      const path = getAppNameByPath(location.pathname);
      app.open(path);
    }
  }, [location]);

  let element = useRoutes(routesList);

  return element;
}
