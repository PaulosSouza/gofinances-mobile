import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonText } from './styles';

import { useTypeTransaction, TypeTransaction } from '../../hooks/transaction';

interface ButtonProps extends RectButtonProperties {
  children: string;
  icon: string;
  iconColor: string;
  onPress(): void;
  type: TypeTransaction;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  iconColor,
  children,
  onPress,
  type,
  ...rest
}) => {
  const { typeTransaction } = useTypeTransaction();

  return (
    <Container
      onPress={onPress}
      isIncomeOrOutcome={typeTransaction === type ? typeTransaction : ''}
      {...rest}
    >
      <Icon size={24} name={icon} color={iconColor} />
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
