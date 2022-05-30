import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { Container, HomeWidgets } from "./HomeStyles";
import { userData, transactionData } from "../../data";
import SmallWidget from "../../components/smallWidget/SmallWidget";
import LargeWidget from "../../components/largeWidget/LargeWidget";

function Home() {
  return (
    <Container>
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="activeusers"
      />
      <HomeWidgets>
        <SmallWidget />
        <LargeWidget data={transactionData} />
      </HomeWidgets>
    </Container>
  );
}

export default Home;
