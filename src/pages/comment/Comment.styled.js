import styled from "styled-components";

export const NewUserContainer = styled.div`
  flex: 4;
  padding: 20px;
  margin: 0 auto;
  .newUserTitle {
  }
`;

export const NewUserForm = styled.form`
  width: 90%;
  display: flex;
  flex-wrap: wrap;

  .genderLabel {
    margin-top: 10px;
  }
  .newUserSelect {
    height: 40px;
    border-radius: 5px;
  }
`;

export const FormItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;

  label {
    margin-bottom: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 14px;
    text-transform: uppercase;
    color: lightgray;
  }

  input {
    height: 30px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }
`;

export const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .radioContainer {
    display: flex;
    align-items: center;
  }
  input {
    margin-top: -10px;
    margin-right: 10px;
  }

  label {
    color: #bbb;
    font-size: 14px;
  }
`;

export const NewUserButton = styled.button`
  margin-top: 40px;
  height: 40px;
  width: 280px;
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
