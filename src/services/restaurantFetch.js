import { fetchData } from "./loginFetch";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const getRestaurants = async () => {
  return await fetchData(`${BASE_URL}/restaurants`);
};