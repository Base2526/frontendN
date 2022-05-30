import { Container, ChartTitle } from "./ChartStyles";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Chart({ title, data, dataKey, grid }) {
  return (
    <Container>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#03bafc" />
          <Line type="monotone" dataKey={dataKey} stroke="#03bafc" />
          {grid && <CartesianGrid stroke="#555" />}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default Chart;
