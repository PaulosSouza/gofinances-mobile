import styled, { css } from 'styled-components/native';
import { transparentize } from 'polished';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  isIncomeOrOutcome: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  border: 1.5px solid ${transparentize(0.6, '#969CB3')};
  width: 180px;
  border-radius: 8px;

  ${props =>
    props.isIncomeOrOutcome === 'income' &&
    css`
      background-color: ${transparentize(0.7, '#12A454')};
      border: none;
    `}

  ${props =>
    props.isIncomeOrOutcome === 'outcome' &&
    css`
      background-color: ${transparentize(0.7, '#E83F5B')};
      border: none;
    `}
`;

export const ButtonText = styled.Text`
  margin-left: 12px;
  font-size: 14px;
  line-height: 21px;
  font-family: 'Poppins-Regular';
  color: #363f5f;
`;
