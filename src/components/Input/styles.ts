import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  background-color: #fff;
  height: 50px;
  margin: 0 0 16px;
  padding: 0 16px;

  border-width: 1px;
  border-color: #fff;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: #12a454;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Poppins-Regular';
  font-size: 16px;
`;
