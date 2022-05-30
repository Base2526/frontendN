import styled from "styled-components";

export const ProductsContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #fff;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .editBtn {
    border: none;
    border-radius: 10px;
    padding: 3px 10px;
    background-color: #dbffee;
    color: #078f4e;
    cursor: pointer;
  }

  .deleteBtn {
    color: red;
    cursor: pointer;
  }
`;
