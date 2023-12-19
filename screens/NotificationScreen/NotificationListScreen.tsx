import React from "react";
import {
  Text,
  Box,
  HStack,
  Button,
  VStack,
  Image,
  ScrollView,
} from "native-base";
import { NotificationListScreenProps } from "../../Navigator/NotificationNavigator";
import NotificationItem from "../../components/NotificationItem/NotificationItem";

const NotificationListScreen = ({
  navigation,
  route,
}: NotificationListScreenProps) => {
  return (
    <Box
      backgroundColor="#fff"
      borderRadius={20}
      maxW="90%"
      alignSelf="center"
      p={5}
      maxH="95%"
    >
      <HStack space={5} mb={5}>
        <Button borderRadius={20}>Tất cả</Button>
        <Button borderRadius={20}>Chưa đọc</Button>
      </HStack>
      <ScrollView>
        <VStack space={5}>
          <NotificationItem
            image="https://picsum.photos/200"
            content="Đây là thông báo 1"
            time="12/12/2023, 14:44:44"
            isRead={true}
          />
          <NotificationItem
            image="https://picsum.photos/200"
            content="Đây là thông báo 2"
            time="12/12/2023, 14:44:44"
            isRead={false}
          />
          <NotificationItem
            image="https://picsum.photos/200"
            content="Đây là thông báo 3"
            time="12/12/2023, 14:44:44"
            isRead={true}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default NotificationListScreen;
