import React, { createContext, useState, useCallback, useContext } from 'react';

export type TypeTransaction = 'income' | 'outcome' | '';

interface TransactionContextData {
  typeTransaction: TypeTransaction;
  changeTypeTransaction(type: TypeTransaction): void;
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData,
);

export const TransactionProvider: React.FC = ({ children }) => {
  const [typeTransaction, setTypeTransaction] = useState<TypeTransaction>('');

  const changeTypeTransaction = useCallback((type: TypeTransaction) => {
    setTypeTransaction(type);
  }, []);

  return (
    <TransactionContext.Provider
      value={{ typeTransaction, changeTypeTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export function useTypeTransaction(): TransactionContextData {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransaction must be user within an TransactionProvider',
    );
  }

  return context;
}
