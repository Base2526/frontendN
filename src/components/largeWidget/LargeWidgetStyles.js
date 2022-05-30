import styled from "styled-components";
import "./LargeWidgetStyles";

export const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 1px 0px 11px -1px #000000;
  box-shadow: 1px 0px 5px -1px #000000;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

export const TableRow = styled.tr``;

export const TableHeading = styled.th`
  text-align: left;
`;

export const TableData = styled.td`
  font-size: 15px;
  font-weight: 300;

  .userInfo {
    display: flex;
    align-items: center;
  }

  img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const WidgetLargeButton = styled.button`
  padding: 5px;
  width: 80px;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;

  &.approved {
    background: #dbffee;
    color: #078f4e;
  }
  &.declined {
    background: #ffccf3;
    color: #dd0c52;
  }
  &.pending {
    background: #cbd8fd;
    color: #0c42dd;
  }
`;
