import './i18n';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  Login,
  NotFound,
  Layout,
  Dashboard,
  Users,
} from './containers/pageListAsync';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import PrivateRoute from './PrivateRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{ top: '8px' }}
        toastOptions={{ duration: 3000, position: 'top-right' }}
      />
    </Provider>
  );
}

export default App;
