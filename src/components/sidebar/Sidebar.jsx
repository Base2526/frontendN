import {
  Container,
  Wrapper,
  SidebarMenu,
  Title,
  List,
  ListItem
} from "./SidebarStyles";

import {
  LineStyle,
  Timeline,
  TrendingUp,
  Group,
  Info,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline
} from "@material-ui/icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Container>
      <Wrapper>
        <SidebarMenu>
          <Title>Dashboard</Title>
          <List>
            <Link to="/" className="link">
              <ListItem>
                <LineStyle className="icon" />
                <div>Home</div>
              </ListItem>
            </Link>
            <ListItem>
              <Timeline className="icon" />
              <div>Analytics</div>
            </ListItem>
            <ListItem>
              <TrendingUp className="icon" />
              <div>Sales</div>
            </ListItem>
            <Link to="/users" className="link">
              <ListItem>
                <Group className="icon" />
                <div>Users</div>
              </ListItem>
            </Link>
          </List>
          <Title>Quick Menu</Title>
          <List>
            <ListItem>
              <Info className="icon" />
              <div>About</div>
            </ListItem>
            <Link to="/products" className="link">
              <ListItem>
                <Storefront className="icon" />
                <div>Products</div>
              </ListItem>
            </Link>
            <ListItem>
              <AttachMoney className="icon" />
              <div>Transactions</div>
            </ListItem>
            <ListItem>
              <BarChart className="icon" />
              <div>Reports</div>
            </ListItem>
          </List>
          <Title>Notifications</Title>
          <List>
            <ListItem>
              <MailOutline className="icon" />
              <div>Mail</div>
            </ListItem>
            <ListItem>
              <DynamicFeed className="icon" />
              <div>Feedback</div>
            </ListItem>
            <ListItem>
              <ChatBubbleOutline className="icon" />
              <div>Messages</div>
            </ListItem>
            <ListItem>
              <WorkOutline className="icon" />
              <div>Manage</div>
            </ListItem>
          </List>
        </SidebarMenu>
      </Wrapper>
    </Container>
  );
}

export default Sidebar;
