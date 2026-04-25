import { createProduct, getAllProducts, getProduct, getSellerProducts } from "../services/product.api";
import { useDispatch } from "react-redux";
import { setAllProducts, setProduct, setSellerProducts } from "../state/product.slice";

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

  const handleGetAllProducts = async () => {
    try {
      const response = await getAllProducts();
      dispatch(setAllProducts(response.products));
      return response.products;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProduct = async (productId) => {
    try {
      const response = await getProduct(productId);
      dispatch(setProduct(response.product));
      return response.product;
    } catch (error) {
      console.log(error);
    }
  };

  return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleGetProduct };
};
