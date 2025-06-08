import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Login Page
export const Layout = loadable(() => import('./Layout'), {
  fallback: <Loading />,
});
// Login Page
export const Login = loadable(() => import('./Login'), {
  fallback: <Loading />,
});
// Dashboard Page
export const AdminDashboard = loadable(() => import('./AdminDashboard'), {
  fallback: <Loading />,
});
// Dashboard Page
export const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});

//User Page
export const Users = loadable(() => import('./Users'), {
  fallback: <Loading />,
});

// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
