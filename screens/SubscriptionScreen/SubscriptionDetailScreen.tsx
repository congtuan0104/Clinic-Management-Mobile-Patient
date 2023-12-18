import {
  Text,
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  VStack,
  View,
} from "native-base";
import { SubscriptionDetailScreenProps } from "../../Navigator/SubscriptionNavigator";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { appColor } from "../../theme";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function SubscriptionDetailScreen({
  navigation,
  route,
}: SubscriptionDetailScreenProps) {
  const userInfo = useAppSelector(userInfoSelector);
  return (
    <Box>
      <Box
        width="90%"
        alignSelf="center"
        alignItems="center"
        borderRadius={20}
        backgroundColor={appColor.white}
        p={5}
        borderColor={appColor.backgroundPrimary}
        borderWidth={2}
        mt={5}
      >
        <Box
          width="full"
          alignItems="center"
          justifyContent="center"
          height="1/5"
        >
          <HStack space={10} alignItems="center" justifyContent="center">
            <Fontisto
              name="shopping-package"
              size={50}
              color={appColor.primary}
            />
            <Heading fontSize={40} color={appColor.primary}>
              Premium
            </Heading>
          </HStack>
        </Box>
        <Box alignItems="flex-start" width="100%" minH="80">
          <VStack space="5">
            <HStack width="full">
              <Heading size="md">
                Gói dành cho phòng khám nhỏ từ 10 đến 50 người, sử dụng để quản
                lý các chức năng cơ bản.
              </Heading>
            </HStack>
            <HStack
              space={2}
              justifyContent="flex-start"
              alignItems="center"
              width="full"
            >
              <FontAwesome
                name="check-circle"
                size={30}
                color={appColor.backgroundPrimary}
              />
              <Text fontSize={15} color={appColor.textTitle}>
                Quản lý nhóm từ 10-50 người
              </Text>
            </HStack>
            <HStack space={2} justifyContent="flex-start" alignItems="center">
              <FontAwesome
                name="check-circle"
                size={30}
                color={appColor.backgroundPrimary}
              />
              <Text fontSize={15} color={appColor.textTitle}>
                Gọi điện thoại, nhắn tin trò chuyện miễn phí, không giới hạn
              </Text>
            </HStack>
            <HStack
              space={2}
              justifyContent="flex-start"
              alignItems="center"
              width="full"
            >
              <FontAwesome
                name="check-circle"
                size={30}
                color={appColor.backgroundPrimary}
              />
              <Text fontSize={15} color={appColor.textTitle}>
                Quản lý vật tư y tế
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box width="full" alignItems="center" py={3} mb={3}>
          <Button disabled width="full">
            Hạn dùng: 2/9/2024
          </Button>
        </Box>
      </Box>
      <Button
        mt={16}
        width="90%"
        alignSelf="center"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Quay lại
      </Button>
    </Box>
  );
}
