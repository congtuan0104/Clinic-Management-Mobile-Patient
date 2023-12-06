import { Text, Button } from "native-base";
import React from "react";
import { GroupChatInfo } from "../../../types";
import { chatService } from "../../../services/chat.services";
import { ChattingGroupListScreenProps } from "./ChattingScreen";

export default function ChattingGroupListScreen({
  navigation,
  route,
}: ChattingGroupListScreenProps) {
  const [groupMessageList, setGroupMessageList] = React.useState<
    GroupChatInfo[]
  >([]);

  React.useEffect(() => {
    const getListGroupChat = async () => {
      const response = await chatService.getListGroupChat();
      if (response.status) {
        const groupList = response.data || [];
        setGroupMessageList(groupList);
      }
    };
    getListGroupChat();
  }, []);

  const navigateToChatDetail = (groupId: string) => {
    navigation.navigate("ChattingDetail", { groupId });
  };

  const renderGroupList = () => {
    return groupMessageList.map((group) => (
      <Button key={group.id} onPress={() => navigateToChatDetail(group.id)}>
        <Text>
          {group.groupName} {/* Assuming groupName is displayed */}
        </Text>
      </Button>
    ));
  };
  return (
    <React.Fragment>
      {groupMessageList.length ? (
        renderGroupList()
      ) : (
        <Text>Ban chua tham gia nhom</Text>
      )}
    </React.Fragment>
  );
}
