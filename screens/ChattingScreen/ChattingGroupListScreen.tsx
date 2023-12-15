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
  Input,
  Icon,
} from "native-base";
import React from "react";
import { GroupChatInfo } from "../../types";
import { chatService } from "../../services/chat.services";
import { ChattingGroupListScreenProps } from "../../Navigator/ChattingNavigator";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { appColor } from "../../theme";
export default function ChattingGroupListScreen({
  navigation,
  route,
}: ChattingGroupListScreenProps) {
  const [groupMessageList, setGroupMessageList] = React.useState<
    GroupChatInfo[]
  >([]);
  const [searchList, setSearchList] = React.useState<GroupChatInfo[]>([]);

  React.useEffect(() => {
    // Lấy danh sách group chat
    const getListGroupChat = async () => {
      const response = await chatService.getListGroupChatByUserId("fff");
      if (response.status) {
        const groupList = response.data || [];
        setGroupMessageList(groupList);
        setSearchList(groupList);
      }
    };
    getListGroupChat();
  }, []);

  // Thực hiện việc navigate đến màn hình chat cụ thể
  const navigateToChatDetail = (groupId: string) => {
    navigation.navigate("ChattingDetail", { groupId });
  };

  // Thực hiện phần tìm kiếm trò chuyện
  const handleSearch = (event: string) => {
    if (event === "") {
      setSearchList(groupMessageList);
    } else {
      setSearchList(
        searchList.filter(
          (item) => item.name.toLowerCase().indexOf(event.toLowerCase()) !== -1
        )
      );
    }
  };

  const renderGroupList = () => {
    return (
      <Box flex="1">
        <Box alignItems="center">
          {/** ***************************SEARCH BAR ****************************** */}
          <Input
            placeholder="Tìm kiếm nhóm trò chuyện"
            width="90%"
            borderRadius="50"
            py="3"
            px="1"
            fontSize="14"
            onChangeText={(e) => {
              handleSearch(e);
            }}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="mic" />}
              />
            }
          />
        </Box>
        {/** *************************** RENDER USER LIST ****************************** */}
        <FlatList
          mt={2}
          style={{ width: "90%" }}
          data={searchList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToChatDetail(item.name)}>
              <Box alignItems="center" py="2">
                <HStack
                  width="90%"
                  space={[2, 3]}
                  justifyContent="space-between"
                >
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
        <TouchableOpacity
          style={styles.but}
          onPress={() => {
            navigation.navigate("CreateChattingGroup");
          }}
        >
          <Icon
            as={<MaterialIcons name="chat" color="white" />}
            color={appColor.white}
            size={8}
          />
        </TouchableOpacity>
      </Box>
    );
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

const styles = StyleSheet.create({
  but: {
    position: "absolute",
    bottom: 15,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: appColor.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
