import React from "react";
import { ChattingScreenProps } from "../UserScreen";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ChattingDetailScreen from "./ChattingDetailScreen";
import ChattingGroupListScreen from "./ChattingGroupListScreen";

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
  return (
    <ChattingStackNavigator.Navigator initialRouteName="ChattingGroupList">
      <ChattingStackNavigator.Screen
        name="ChattingGroupList"
        component={ChattingGroupListScreen}
      />
      <ChattingStackNavigator.Screen
        name="ChattingDetail"
        component={ChattingDetailScreen}
        options={({ route }) => ({ title: route.params.groupId })}
      />
    </ChattingStackNavigator.Navigator>
  );
}
