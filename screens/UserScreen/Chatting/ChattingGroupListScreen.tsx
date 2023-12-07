import {
  Text,
  Button,
  Box,
  Heading,
  FlatList,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from "native-base";
import React from "react";
import { GroupChatInfo } from "../../../types";
import { chatService } from "../../../services/chat.services";
import { ChattingGroupListScreenProps } from "./ChattingScreen";
import { TouchableOpacity } from "react-native";

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
    return (
      <Box>
        <FlatList
          data={groupMessageList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToChatDetail(item.name)}>
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                py="2"
                padding={2}
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatar_url,
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                      style={{ flexWrap: "wrap" }}
                    >
                      {item.name.length > 30
                        ? `${item.name.slice(0, 30)}...`
                        : item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.subtitle.length > 30
                        ? `${item.subtitle.slice(0, 30)}...`
                        : item.subtitle}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    );
  };

  const [search, setsearch] = React.useState<string | null>("");

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
