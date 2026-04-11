import { apiInstance } from "../../../lib/api.instance";

export const register = async ({ email, contact, password, fullname, isSeller }) => {
  const response = await apiInstance.post("/auth/register", {
    email,
    contact,
    password,
    fullname,
    isSeller
  });
  return response.data;
};
