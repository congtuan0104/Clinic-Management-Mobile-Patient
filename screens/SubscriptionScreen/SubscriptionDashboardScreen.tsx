import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  View,
} from "native-base";
import { SubscriptionDashboardScreenProps } from "../../Navigator/SubscriptionNavigator";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { appColor } from "../../theme";

export default function SubscriptionDashboardScreen({
  navigation,
  route,
}: SubscriptionDashboardScreenProps) {
  const userInfo = useAppSelector(userInfoSelector);
  return (
    <Box
      bgColor="#fff"
      width="90%"
      alignSelf="center"
      alignItems="center"
      p={5}
      borderRadius={20}
    >
      <Box
        width="full"
        alignItems="center"
        py={3}
        mb={3}
        borderBottomWidth={1}
        borderBottomColor="#EDEDF2"
      >
        <Avatar
          alignSelf="center"
          bg="green.500"
          source={{
            uri: `https://ui-avatars.com/api/?name=${userInfo?.firstName}`,
          }}
          size="xl"
          mb={2}
        >
          ABC
        </Avatar>
        <Text color={appColor.textTitle} fontWeight="extrabold" fontSize="17">
          {userInfo?.lastName + " " + userInfo?.firstName}
        </Text>
        <Text color={appColor.textSecondary}>{userInfo?.email}</Text>
      </Box>
      <Box alignItems="flex-start" width="100%">
        <VStack space="5">
          <Heading size="md">Gói đang sử dụng</Heading>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Tên gói</Text>
            <Text color={appColor.textSecondary}>
              Gói Small VIP (phòng khám nhỏ)
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Số người dùng</Text>
            <Text color={appColor.textSecondary}>45/50</Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text color={appColor.textSecondary}>Thời hạn</Text>
            <Text color={appColor.textSecondary}>02/09/2024</Text>
          </HStack>

          <HStack width="full">
            <Button
              width="full"
              onPress={() => {
                navigation.navigate("SubscriptionDetail");
              }}
            >
              Xem chi tiết
            </Button>
          </HStack>
          <HStack width="full">
            <Button
              width="full"
              onPress={() => {
                navigation.navigate("SubscriptionList");
              }}
            >
              Mua gói ngay
            </Button>
          </HStack>
          <HStack width="full">
            <Button
              width="full"
              onPress={() => {
                navigation.navigate("SubscriptionHistory");
              }}
            >
              Xem lịch sử
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
