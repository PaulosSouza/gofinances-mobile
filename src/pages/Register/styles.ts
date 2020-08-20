import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Header = styled.View`
  padding: 70px 30px 55px;
  height: 105px;
  background-color: #5636d3;

  flex-direction: row;
  justify-content: space-between;
`;

export const RegisterContainer = styled.View`
  padding: 24px;
`;

export const RegisterTitle = styled.Text`
  color: #000;
  font-size: 20px;
  line-height: 30px;
  font-family: 'Poppins-Regular';
  margin-bottom: 16px;
`;

export const InputRegister = styled.TextInput`
  background-color: #fff;
  height: 50px;
  margin: 0 0 16px;
  padding: 16px;
  font-family: 'Poppins-Regular';
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 16px;
`;

export const SendButton = styled(RectButton)`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ff872c;
  height: 50px;
`;

export const SendButtonText = styled.Text`
  font-family: 'Poppins-Medium';
  color: #fff;
  font-size: 16px;
  line-height: 21px;
`;
