import { fetchData } from "./loginFetch";

export const getRestaurants = async () => {
  return await fetchData('/restaurants');
};