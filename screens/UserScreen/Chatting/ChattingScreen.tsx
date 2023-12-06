import { View, Text } from "react-native";
import React from "react";
import { chatService } from "../../../services/chat.services";
import { GroupChatInfo } from "../../../types";
const ChattingScreen = () => {
  // Gọi API lấy danh sách các nhóm Chat mà user đó tham gia
  // Sau khi có danh sách, sẽ render các route có param, khi gọi thì sẽ chuyển sang màn hình quản lý tin nhắn.

  // Khởi tạo trạng thái rỗng danh sách nhóm chat
  const [groupMessageList, setGroupMessageList] = React.useState<
    GroupChatInfo[]
  >([]);

  React.useEffect(() => {
    // Gọi API lấy danh sách trong useEffect
    const getListGroupChat = async () => {
      const response = await chatService.getListGroupChat();
      // Nếu thành công: lấy dữ liệu
      if (response.status) {
        const groupList = response.data;
        // Nếu tồn tại danh sách: gán vào state
        if (groupList?.length) {
          setGroupMessageList(groupList);
        } else {
          // Nếu danh sách rỗng: Gán mảng rỗng cho state
          setGroupMessageList([]);
        }
      }
    };
    getListGroupChat();
  }, [groupMessageList]);
  const renderGroupMessageList = () => {
    return groupMessageList.map((item, index) => {
      return <Text key={index}>{item.groupName}</Text>;
    });
  };
  return (
    <View>
      <Text>ChattingScreen</Text>
      {groupMessageList.length ? (
        renderGroupMessageList()
      ) : (
        <Text>Chưa tham gia</Text>
      )}
    </View>
  );
};

export default ChattingScreen;
