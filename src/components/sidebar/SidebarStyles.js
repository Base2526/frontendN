import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  height: calc(100vh-50px);
  background-color: #222;
  position: sticky;
  top: 50;
`;

export const Wrapper = styled.div`
  padding: 20px;
  color: #ddd;
`;

export const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  font-size: 13px;
  color: #999;
`;

export const List = styled.ul`
  list-style: none;
  padding: 5px;
  margin-bottom: 20px;

  .active {
    background-color: #eeeeee;
  }
`;

export const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: #333;
  }

  div {
    margin-left: 10px;
  }
`;
