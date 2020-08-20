import React, { useRef, useCallback } from 'react';
import {
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { useTypeTransaction } from '../../hooks/transaction';

import api from '../../services/api';

import {
  Container,
  Header,
  RegisterContainer,
  RegisterTitle,
  ButtonsContainer,
  SendButton,
  SendButtonText,
} from './styles';

import logoImg from '../../assets/Logo.png';

interface RegisterTransactionData {
  title: string;
  value: string;
  category: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputPriceRef = useRef<TextInput>(null);
  const inputCategoryRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { changeTypeTransaction, typeTransaction } = useTypeTransaction();

  useFocusEffect(
    useCallback(() => {
      formRef.current?.setErrors({});
      changeTypeTransaction('');
    }, [changeTypeTransaction]),
  );

  const handleRegisterTransaction = useCallback(
    async (data: RegisterTransactionData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Título é obrigatório'),
          value: Yup.string().required('Valor é obrigatório'),
          category: Yup.string().required('Categoria é obrigatório'),
        });

        if (!typeTransaction) {
          Alert.alert('Você precisa selecionar um tipo de transação!');
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataFormatted = {
          ...data,
          type: typeTransaction,
        };

        await api.post('/transactions', dataFormatted);

        Alert.alert('Cadastro da transação efetuada com sucesso!');

        navigation.navigate('Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Error no cadastrado',
          'Ocorreu um erro ao tentar cadastrar uma nova transação, tente novamente',
        );
      }
    },
    [typeTransaction, navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Header>
            <Image source={logoImg} resizeMode="contain" />
          </Header>

          <RegisterContainer>
            <RegisterTitle>Cadastro</RegisterTitle>

            <Form ref={formRef} onSubmit={handleRegisterTransaction}>
              <Input
                autoCorrect={false}
                name="title"
                placeholder="Titulo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPriceRef.current?.focus();
                }}
              />

              <Input
                ref={inputPriceRef}
                autoCorrect={false}
                name="value"
                placeholder="Valor"
                returnKeyType="next"
                keyboardType="numbers-and-punctuation"
                onSubmitEditing={() => {
                  inputCategoryRef.current?.focus();
                }}
              />

              <ButtonsContainer>
                <Button
                  type="income"
                  onPress={() => changeTypeTransaction('income')}
                  icon="arrow-up-circle"
                  iconColor="#12A454"
                >
                  Income
                </Button>

                <Button
                  type="outcome"
                  onPress={() => changeTypeTransaction('outcome')}
                  icon="arrow-down-circle"
                  iconColor="#E83F5B"
                >
                  Outcome
                </Button>
              </ButtonsContainer>

              <Input
                ref={inputCategoryRef}
                name="category"
                placeholder="Categoria"
                placeholderTextColor="#969CB3"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <SendButton
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                <SendButtonText>Enviar</SendButtonText>
              </SendButton>
            </Form>
          </RegisterContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
