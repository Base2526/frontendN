import styled from "styled-components";

export const NewProductContainer = styled.div`
  flex: 4;
  padding: 20px;
  margin: 0 auto;

  .newProductTitle {
  }
`;

export const NewProductForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;

  .newProductSelect {
    height: 40px;
    border-radius: 5px;
  }
  input #file {
    outline: none;
  }
`;

export const FormItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    letter-spacing: 0.5px;
    font-size: 14px;
    text-transform: uppercase;
    color: lightgray;
  }

  input {
    height: 30px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
  }
`;

export const NewProductButton = styled.button`
  margin-top: 40px;
  height: 40px;
  width: 80px;
  border: none;
  padding: 7px;
  border-radius: 10px;
  background-color: darkblue;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1214a1;
  }
`;
