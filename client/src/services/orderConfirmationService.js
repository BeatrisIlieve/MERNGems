import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/order-confirmation`;

export const orderConfirmationServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    display: (userId) => request.get(`${baseUrl}/display/${userId}`),
  };
};
