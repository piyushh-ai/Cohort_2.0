import { createProduct, getSellerProducts } from "../services/product.api";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProduct = async (productData) => {
    try {
      const response = await createProduct(productData);
      return response.product;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSellerProducts = async () => {
    try {
      const response = await getSellerProducts();
      dispatch(setSellerProducts(response.products));
      return response.products;
    } catch (error) {
      console.log(error);
    }
  };

  return { handleCreateProduct, handleGetSellerProducts };
};
