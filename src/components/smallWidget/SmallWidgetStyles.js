import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 1px 0px 11px -1px #000000;
  box-shadow: 1px 0px 5px -1px #000000;
  padding: 20px;
  margin-right: 20px;
`;

export const WidgetList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 20px 0;
  position: relative;

  img {
    height: 40px;
    width: 40px;
    margin-right: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user {
    display: flex;
    flex-direction: column;
  }

  .username {
    font-weight: 600;
  }

  .job {
    font-weight: 300;
    font-size: 14px;
    color: #9c9c9c;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 10px;
  border: none;
  border-radius: 10px;
  padding: 4px 10px;
  background-color: #eeeef7;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #777;
    color: #fff;
  }

  .icon {
    margin-right: 5px;
    font-size: 16px;
  }
`;
