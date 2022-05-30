import {
  NewProductContainer,
  NewProductForm,
  FormItem,
  GenderContainer,
  NewProductButton
} from "./NewProduct.styled";

function NewProduct() {
  return (
    <NewProductContainer>
      <h2 className="newProductTitle">New Product</h2>
      <NewProductForm>
        <FormItem>
          <label>Image</label>
          <input type="file" id="file" />
        </FormItem>
        <FormItem>
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" />
        </FormItem>
        <FormItem>
          <label>Stock</label>
          <input type="email" placeholder="123" />
        </FormItem>
        <FormItem>
          <label>Active</label>
          <select className="newProductSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FormItem>
        <NewProductButton>Create</NewProductButton>
      </NewProductForm>
    </NewProductContainer>
  );
}

export default NewProduct;
