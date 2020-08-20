import styled, { css } from 'styled-components/native';

interface CardProps {
  isTotal?: boolean;
}

interface ListTransactionProps {
  type: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Header = styled.View`
  padding: 70px 30px 40px;
  height: 267px;
  background-color: #5636d3;

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  line-height: 21px;
  color: #fff;
  opacity: 0.6;
  font-family: 'Poppins-Regular';
`;

export const CardsContainer = styled.View<CardProps>`
  padding: 20px 23px 56px;
  background-color: #fff;
  height: 200px;
  width: 300px;
  margin-left: 25px;

  ${props =>
    props.isTotal &&
    css`
      background-color: #ff872c;
    `}
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardTitle = styled.Text<CardProps>`
  color: #363f5f;
  font-family: 'Poppins-Regular';
  font-size: 16px;
  line-height: 21px;

  ${props =>
    props.isTotal &&
    css`
      color: #fff;
    `}
`;

export const CardContent = styled.View`
  margin-top: 55px;
`;

export const CardValue = styled.Text<CardProps>`
  font-family: 'Poppins-Regular';
  font-size: 30px;
  line-height: 45px;
  color: #363f5f;

  ${props =>
    props.isTotal &&
    css`
      color: #fff;
    `}
`;

export const CardDescription = styled.Text`
  color: #969cb3;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  line-height: 18px;
`;

export const ListContainer = styled.View`
  flex: 1;
  margin-top: 87px;
  padding: 20px 30px 0;
`;

export const ListTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 24px;
`;

export const ListCardContainer = styled.View`
  background-color: #fff;
  height: 128px;
  width: 100%;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const ListCardTitle = styled.Text`
  color: #363f5f;
  font-family: 'Poppins-Regular';
  font-size: 16px;
  line-height: 21px;
`;

export const ListCardValue = styled.Text<ListTransactionProps>`
  color: #12a454;
  font-family: 'Poppins-Regular';
  font-size: 24px;
  line-height: 30px;
  padding-top: 4px;

  ${props =>
    props.type === 'outcome' &&
    css`
      color: #e83f5b;
    `}
`;

export const ListCardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
`;

export const Category = styled.Text`
  color: #969cb3;
  font-size: 14px;
  line-height: 21px;
`;

export const CategoryDate = styled.Text`
  color: #969cb3;
  font-size: 14px;
  line-height: 21px;
`;
