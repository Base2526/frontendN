import { Link, useParams } from "react-router-dom";
import {
  ProductContainer,
  TitleContainer,
  ProductTopContainer,
  ProductBottomContainer,
  ProductTopLeft,
  ProductTopRight,
  ProductInfoTop,
  ProductInfoBottom,
  ProductInfoItem,
  ProductForm,
  ProductFormLeft,
  ProductFormRight,
  ProductUpload,
  ProductButton
} from "./Product.styled";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { ProductContext } from "../../Store";
import { useContext } from "react";
import { productSales } from "../../data";

function Product() {
  const [productData, setProductData] = useContext(ProductContext);
  const { id } = useParams();
  const [product] = productData.filter(
    (product) => product.id === parseInt(id)
  );
  return (
    <ProductContainer>
      <TitleContainer>
        <h1>Product</h1>
        <Link to="/newProduct">
          <button>Create</button>
        </Link>
      </TitleContainer>
      <ProductTopContainer>
        <ProductTopLeft>
          <Chart
            data={productSales}
            dataKey="sales"
            title="Sales Performance"
          />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoTop>
            <img src={product.image} alt="" />
            <span>{product.name}</span>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product.id}</span>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">{product.sales}</span>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">{product.status}</span>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.stock}</span>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTopContainer>
      <ProductBottomContainer>
        <ProductForm>
          <ProductFormLeft>
            <label>Product Name</label>
            <input type="text" placeholder={product.name} />
            <label>In Stock</label>
            <select name="inStock" id="inStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <img src={product.image} alt="" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </ProductUpload>
            <ProductButton>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottomContainer>
    </ProductContainer>
  );
}

export default Product;
