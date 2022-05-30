import { Container, Item, Title, MoneyContainer } from "./FeaturedInfoStyles";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

function Home() {
  return (
    <Container>
      <Item>
        <Title>Revenue</Title>
        <MoneyContainer>
          <span className="money">$2,145</span>
          <span className="rate">
            -11.4
            <ArrowDownward className="icon negative" />
          </span>
        </MoneyContainer>
        <span className="subtitle">Compared to last month</span>
      </Item>
      <Item>
        <Title>Sales</Title>
        <MoneyContainer>
          <span className="money">$5,145</span>
          <span className="rate">
            -1.4
            <ArrowDownward className="icon negative" />
          </span>
        </MoneyContainer>
        <span className="subtitle">Compared to last month</span>
      </Item>
      <Item>
        <Title>Cost</Title>
        <MoneyContainer>
          <span className="money">$3,145</span>
          <span className="rate">
            +3.5
            <ArrowUpward className="icon" />
          </span>
        </MoneyContainer>
        <span className="subtitle">Compared to last month</span>
      </Item>
    </Container>
  );
}

export default Home;
