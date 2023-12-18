import { axiosClient } from "../config/axios";
import { IApiResponse, GroupChatInfo, ICreateGroupChatRequest } from "../types";
import { IClinicInfo } from "../types/clinic.types";

export const clinicService = {
  async getUsersInClinic(
    clinicId: string
  ): Promise<IApiResponse<IClinicInfo[]>> {
    return axiosClient.get(`/clinics/${clinicId}/users`);
  },
};
