import { LoginInfo } from "../types";
import { axiosClient } from "../utils/axios";

export const loginService = async (data: LoginInfo) => {
  return await axiosClient
    .post(
      "/auth/login",
      {
        email: data.username,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
