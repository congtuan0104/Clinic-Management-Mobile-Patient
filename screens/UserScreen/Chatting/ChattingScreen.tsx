import React from "react";
import { ChattingScreenProps } from "../UserScreen";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ChattingDetailScreen from "./ChattingDetailScreen";
import ChattingGroupListScreen from "./ChattingGroupListScreen";
import { Ionicons } from "@expo/vector-icons";
import { Actionsheet, Text, useDisclose, Image, HStack } from "native-base";
import { appColor } from "../../../theme";

export type ChatDetailStackParamList = {
  ChattingGroupList: undefined;
  ChattingDetail: { groupId: string };
};

export type ChattingGroupListScreenProps = NativeStackScreenProps<
  ChatDetailStackParamList,
  "ChattingGroupList"
>;

export type ChattingDetailScreenProps = NativeStackScreenProps<
  ChatDetailStackParamList,
  "ChattingDetail"
>;

const ChattingStackNavigator =
  createNativeStackNavigator<ChatDetailStackParamList>();

export default function ChattingScreen({
  navigation,
  route,
}: ChattingScreenProps) {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <ChattingStackNavigator.Navigator initialRouteName="ChattingGroupList">
      <ChattingStackNavigator.Screen
        name="ChattingGroupList"
        component={ChattingGroupListScreen}
        options={{ headerShown: false }}
      />
      <ChattingStackNavigator.Screen
        name="ChattingDetail"
        component={ChattingDetailScreen}
        options={({ route }) => ({
          headerTitle: (props) => {
            return (
              <HStack space={2} justifyContent="center" alignItems="center">
                <Image
                  src="https://picsum.photos/200"
                  borderRadius={100}
                  size="10"
                  alt="ff"
                />
                <Text fontWeight="bold" fontSize="16">
                  {route.params.groupId.length > 15
                    ? `${route.params.groupId.slice(0, 15)}...`
                    : route.params.groupId}
                </Text>
              </HStack>
            );
          },
          headerRight: () => (
            <>
              <Ionicons
                name="ellipsis-vertical-outline"
                size={24}
                color="black"
                onPress={onOpen}
              />
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <Actionsheet.Item>Xem thông tin nhóm</Actionsheet.Item>
                  <Actionsheet.Item>Tùy chỉnh</Actionsheet.Item>
                  <Actionsheet.Item color="red.500">Rời nhóm</Actionsheet.Item>
                </Actionsheet.Content>
              </Actionsheet>
            </>
          ),
        })}
      />
    </ChattingStackNavigator.Navigator>
  );
}
