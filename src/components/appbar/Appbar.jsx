import {
  Container,
  Wrapper,
  TopLeft,
  TopRight,
  Logo,
  IconContainer,
  TopIconBadge,
  TopAvatar
} from "./AppbarStyles";

import { NotificationsNone, Language, Settings } from "@material-ui/icons";

function Appbar() {
  return (
    <Container>
      <Wrapper>
        <TopLeft>
          <Logo>Admin Dev</Logo>
        </TopLeft>
        <TopRight>
          <IconContainer>
            <NotificationsNone />
            <TopIconBadge>2</TopIconBadge>
          </IconContainer>
          <IconContainer>
            <Language />
            <TopIconBadge>2</TopIconBadge>
          </IconContainer>
          <IconContainer>
            <Settings />
          </IconContainer>
          <TopAvatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHoqg4ikD0Gp1l_yc2jpvEdN8Xddy03FZgQ&usqp=CAU" />
        </TopRight>
      </Wrapper>
    </Container>
  );
}

export default Appbar;
