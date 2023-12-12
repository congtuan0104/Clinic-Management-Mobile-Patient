// export interface GroupChatInfo {
//   id: string;
//   groupName: string;
//   maxMember: number;
// }

export interface GroupChatInfo {
  id: string;
  name: string;
  avatar_url: string;
  subtitle: string;
}

export interface ICreateGroupChatRequest {
  groupName: string;
  maxMember: number;
  type: string;
}

export interface ICreateGroupChatForm {
  groupName: string;
  maxMember: string;
  type: string;
}
