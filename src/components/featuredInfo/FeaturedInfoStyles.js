import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Item = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 1px 0px 11px -1px #000000;
  box-shadow: 1px 0px 5px -1px #000000;

  .subtitle {
    font-size: 15px;
    color: #888;
  }
`;

export const Title = styled.span`
  font-size: 20px;
`;

// export const Title = styled.span``;

// export const Title = styled.span``;

// export const Title = styled.span``;

export const MoneyContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;

  .money {
    font-size: 30px;
    font-weight: bold;
  }

  .rate {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .icon {
    font-size: 15px;
    margin-left: 5px;
    color: green;
  }

  .icon.negative {
    color: red;
  }
`;

export const Price = styled.span``;
