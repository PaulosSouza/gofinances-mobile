import React, { useState, useEffect, useCallback } from 'react';
import { Image, FlatList, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import logoImg from '../../assets/Logo.png';

import {
  Container,
  Header,
  Title,
  CardsContainer,
  CardHeader,
  CardTitle,
  CardValue,
  CardContent,
  ListCardContainer,
  ListContainer,
  ListCardTitle,
  ListCardFooter,
  ListCardValue,
  ListTitle,
  Category,
  CategoryDate,
} from './styles';

import formatValue from '../../utils/formatValue';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  async function loadTransactions(): Promise<void> {
    const response = await api.get('transactions');

    const transactionsFormatted = response.data.transactions.map(
      (transaction: Transaction) => ({
        ...transaction,
        formattedValue: formatValue(transaction.value),
        formattedDate: new Date(transaction.created_at).toLocaleDateString(
          'pt-br',
        ),
      }),
    );

    const balanceFormatted = {
      income: formatValue(response.data.balance.income),
      outcome: formatValue(response.data.balance.outcome),
      total: formatValue(response.data.balance.total),
    };

    setBalance(balanceFormatted);
    setTransactions(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      <Header>
        <Image source={logoImg} resizeMode="contain" />

        <Title>{new Date(Date.now()).toLocaleDateString('pt-br')}</Title>
      </Header>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ position: 'absolute', top: 134 }}
      >
        <CardsContainer>
          <CardHeader>
            <CardTitle>Entradas</CardTitle>

            <Icon name="arrow-up-circle" size={33} color="#12a454" />
          </CardHeader>

          <CardContent>
            <CardValue>{balance.income}</CardValue>
          </CardContent>
        </CardsContainer>

        <CardsContainer>
          <CardHeader>
            <CardTitle>Saída</CardTitle>

            <Icon name="arrow-down-circle" size={33} color="#E83F5B" />
          </CardHeader>

          <CardContent>
            <CardValue>{balance.outcome}</CardValue>
          </CardContent>
        </CardsContainer>

        <CardsContainer isTotal>
          <CardHeader>
            <CardTitle isTotal>Total</CardTitle>

            <Icon name="dollar-sign" size={33} color="#FFF" />
          </CardHeader>

          <CardContent>
            <CardValue isTotal>{balance.total}</CardValue>
          </CardContent>
        </CardsContainer>
      </ScrollView>

      <ListContainer>
        <ListTitle>Listagem</ListTitle>
        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={transactions}
          keyExtractor={transaction => transaction.id}
          renderItem={({ item }) => (
            <ListCardContainer>
              <ListCardTitle>{item.title}</ListCardTitle>
              <ListCardValue type={item.type}>
                {item.type === 'outcome'
                  ? `- ${item.formattedValue}`
                  : item.formattedValue}
              </ListCardValue>

              <ListCardFooter>
                <Category>{item.category.title}</Category>
                <CategoryDate>{item.formattedDate}</CategoryDate>
              </ListCardFooter>
            </ListCardContainer>
          )}
        />
      </ListContainer>
    </Container>
  );
};

export default Dashboard;
