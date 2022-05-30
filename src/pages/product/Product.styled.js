import styled from "styled-components";

export const ProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
  }

  button {
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const ProductTopContainer = styled.div`
  display: flex;
`;

export const ProductTopLeft = styled.div`
  flex: 1;
`;

export const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 1px 0px 11px -1px #000000;
  box-shadow: 1px 0px 5px -1px #000000;
`;

export const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  span {
    font-weight: 600;
  }
`;

export const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;

export const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;

  .productInfoKey {
  }

  .productInfoValue {
    font-weight: 300;
  }
`;

export const ProductBottomContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 1px 0px 11px -1px #000000;
  box-shadow: 1px 0px 5px -1px #000000;
`;

export const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

export const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    color: gray;
  }

  input {
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
    outline: none;
    border-radius: 5px;
  }

  select {
    margin-bottom: 10px;
  }
`;

export const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductUpload = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
  }
`;

export const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: #fff;
  cursor: pointer;
`;
