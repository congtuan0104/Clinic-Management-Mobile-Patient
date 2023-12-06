import { View, Text } from "react-native";
import React from "react";
import { ChattingDetailScreenProps } from "./ChattingScreen";

const ChattingDetailScreen: React.FC<ChattingDetailScreenProps> = ({
  route,
}) => {
  const { groupId } = route.params;

  return (
    <View>
      <Text>Chat Detail Screen for Group ID: {groupId}</Text>
      {/* Add chat messages or other details for the group */}
    </View>
  );
};

export default ChattingDetailScreen;
