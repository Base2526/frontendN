import { DataGrid } from "@material-ui/data-grid";
import {
  ButtonWrapper,
  ProductsContainer,
  ProductWrapper
} from "./ProductList.styled";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../Store";

function ProductList() {
  const [productData, setProductData] = useContext(ProductContext);

  const handleDelete = (id) => {
    setProductData(productData.filter((product) => product.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 220,
      renderCell: (params) => {
        return (
          <ProductWrapper>
            <img src={params.row.image} alt="" />
            {params.row.name}
          </ProductWrapper>
        );
      }
    },
    { field: "stock", headerName: "Stock", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 130
    },
    {
      field: "price",
      headerName: "Price",
      width: 150
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <ButtonWrapper>
            <Link to={`/product/${params.row.id}`}>
              <button className="editBtn">Edit</button>
            </Link>
            <DeleteOutline
              className="deleteBtn"
              onClick={() => handleDelete(params.row.id)}
            />
          </ButtonWrapper>
        );
      }
    }
  ];
  return (
    <ProductsContainer>
      <DataGrid
        rows={productData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </ProductsContainer>
  );
}

export default ProductList;
