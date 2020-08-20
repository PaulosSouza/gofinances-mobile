import React from 'react';

import { TransactionProvider } from './transaction';

const AppProvider: React.FC = ({ children }) => (
  <TransactionProvider>{children}</TransactionProvider>
);

export default AppProvider;
