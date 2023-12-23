import { axiosClient } from "../config/axios";

export const planService = {
  async getPlanList() {
    return axiosClient.get(`/plans`);
  },
};
