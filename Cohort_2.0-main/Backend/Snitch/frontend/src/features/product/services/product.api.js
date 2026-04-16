import { apiInstance } from "../../../lib/api.instance";

export const createProduct = async (productData) => {
  try {
    const response = await apiInstance.post("/product", productData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSellerProducts = async () => {
  try {
    const response = await apiInstance.get("/product/seller");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
