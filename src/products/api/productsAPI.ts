import axios from "axios";

const productsClient = axios.create({
  baseURL: 'http://localhost:3100',
})

export { productsClient };