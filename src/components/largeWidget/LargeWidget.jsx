import {
  Container,
  Table,
  TableRow,
  TableHeading,
  TableData,
  WidgetLargeButton
} from "./LargeWidgetStyles";

const Button = ({ type }) => {
  return (
    <WidgetLargeButton className={`btn ${type}`}>{type}</WidgetLargeButton>
  );
};

function LargeWidget({ data }) {
  return (
    <Container>
      <h2 className="title">Latest transactions</h2>
      <Table>
        <TableRow>
          <TableHeading>Customer</TableHeading>
          <TableHeading>Date</TableHeading>
          <TableHeading>Amount</TableHeading>
          <TableHeading>Status</TableHeading>
        </TableRow>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableData>
                <div className="userInfo">
                  <img src={item.customer} alt="" />
                  <span>{item.username}</span>
                </div>
              </TableData>
              <TableData>{item.date}</TableData>
              <TableData>{item.amount}</TableData>
              <TableData>
                <Button type={item.status} />
              </TableData>
            </TableRow>
          );
        })}
      </Table>
    </Container>
  );
}

export default LargeWidget;
