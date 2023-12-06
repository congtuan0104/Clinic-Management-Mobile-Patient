import { axiosClient } from "../utils/axios";
import { IApiResponse, GroupChatInfo } from "../types";

const mockData = [
  { id: "1", groupName: "chat 1", maxMember: 20 },
  { id: "2", groupName: "chat 13", maxMember: 201 },
  { id: "3", groupName: "chat 14", maxMember: 202 },
  { id: "4", groupName: "chat 113", maxMember: 24 },
  { id: "5", groupName: "chat 11", maxMember: 27 },
];
export const chatService = {
  async getListGroupChat(): Promise<IApiResponse<GroupChatInfo[]>> {
    // Tạm thời giả dữ liệu để trả về
    return {
      data: mockData,
      message: "Thành công",
      status: true,
    };
    return axiosClient.get("/");
  },
};
