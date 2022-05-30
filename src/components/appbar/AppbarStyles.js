import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopLeft = styled.div``;

export const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #eee;
`;

export const TopAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const TopIconBadge = styled.span`
  position: absolute;
  top: -5px;
  right: 1px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

export const Logo = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: #eee;
  cursor: pointer;
`;
