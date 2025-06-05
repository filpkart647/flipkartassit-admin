import React from 'react';
import loadable from '../utils/loadable';
import Loading from './Loading';

export { default as Loading } from './Loading';

export const DateRange = loadable(() => import('./FormElements/DateRange'), {
  fallback: <Loading />,
});
export const CustomDateTimePicker = loadable(
  () => import('./FormElements/CustomDateTimePicker'),
  {
    fallback: <Loading />,
  },
);
export const InputField = loadable(() => import('./FormElements/InputField'), {
  fallback: <Loading />,
});
export const SelectBox = loadable(() => import('./FormElements/SelectBox'), {
  fallback: <Loading />,
});
export const MultipleSelectBox = loadable(
  () => import('./FormElements/MultipleSelectBox'),
  {
    fallback: <Loading />,
  },
);

export const CustomSwitch = loadable(
  () => import('./FormElements/CustomSwitch'),
  {
    fallback: <Loading />,
  },
);

export const TablePagination = loadable(() => import('./TablePagination'), {
  fallback: <Loading />,
});
export const MenuDropdown = loadable(() => import('./MenuDropdown'), {
  fallback: <Loading />,
});
export const Navbar = loadable(() => import('./Navbar'), {
  fallback: <Loading />,
});
export const Chat = loadable(() => import('./Chat'), {
  fallback: <Loading />,
});

export const Sidebar = loadable(() => import('./Sidebar'), {
  fallback: <Loading />,
});
