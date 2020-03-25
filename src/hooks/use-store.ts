import React from 'react';
import store from '../Store';

export const StoreContext = React.createContext(store);

export const useStore = () => React.useContext(StoreContext);