import styled from "styled-components";

export const UserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    letter-spacing: 1px;
  }

  button {
    width: 80px;
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: green;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: darkgreen;
    }
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  margin-top: 25px;

  .userDisplay {
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 1px 0px 11px -1px #000000;
    box-shadow: 1px 0px 5px -1px #000000;
  }

  .userDisplayTop {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .userDisplayTopTitle {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      font-size: 15px;
      letter-spacing: 1px;

      .userDisplayJobTitle {
        font-size: 13px;
        opacity: 0.5;
      }
    }
  }

  .userDisplayBottom {
    margin-top: 25px;

    .detailTitle {
      font-size: 14px;
      opacity: 0.2;
    }

    .userInfo {
      display: flex;
      align-items: center;
      margin: 20px 0;
    }

    .userDisplayIcon {
      font-size: 22px;
    }

    .userInfoTitle {
      margin-left: 10px;
    }
  }

  .userUpdate {
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 1px 0px 11px -1px #000000;
    box-shadow: 1px 0px 5px -1px #000000;
    margin-left: 20px;
  }

  .userUpdateTitle {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

export const UserForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const FormLeft = styled.div`
  .item {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  .item > label {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .userUpdateInput {
    border: none;
    width: 250px;
    border-bottom: 1px solid gray;
    background: transparent;
    height: 30px;
  }
`;

export const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .userUpdateUpload {
    display: flex;
    align-items: center;

    label {
      cursor: pointer;
    }
  }
  button {
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: blue;
    }
  }
`;

export const UserUpdateImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;
