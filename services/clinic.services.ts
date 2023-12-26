import { axiosClient } from "../config/axios";
import { IApiResponse } from "../types";
import { IClinicInfo } from "../types/clinic.types";

export const clinicService = {
  async getUsersInClinic(
    clinicId: string
  ): Promise<IApiResponse<IClinicInfo[]>> {
    return axiosClient.get(`/clinics/${clinicId}/users`);
  },
  async getCLinicByUserId(userId: any) {
    return axiosClient.get(`/clinics`, {
      params: {
        id: userId,
      },
    });
  },
  async createClinic(clinicInfo: any) {
    return axiosClient.post("/clinics", clinicInfo);
  },
};
