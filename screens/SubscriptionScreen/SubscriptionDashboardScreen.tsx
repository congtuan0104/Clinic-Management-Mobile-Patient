import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import { SubscriptionDashboardScreenProps } from "../../Navigator/SubscriptionNavigator";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { appColor } from "../../theme";
import { useEffect, useState } from "react";
import { subscriptionService } from "../../services";
import ToastAlert from "../../components/Toast/Toast";

export default function SubscriptionDashboardScreen({
  navigation,
  route,
}: SubscriptionDashboardScreenProps) {
  const toast = useToast();
  const userInfo = useAppSelector(userInfoSelector);
  const [subscription, setSubscription] = useState<any>(null);
  useEffect(() => {
    const getSubscriptionUsing = async () => {
      // Call API to get plan that user is using it
      // (fake data: using plan has id = 1)
      try {
        const response = await subscriptionService.getUserSubscriptionById(14);
        console.log(response);
        // If success, save subscription in state
        if (response.status) {
          setSubscription(response.data);
        } else {
          setSubscription(null);
        }
      } catch (error) {
        toast.show({
          render: () => {
            return (
              <ToastAlert
                title="Lỗi"
                description="Không tồn tại gói này trong danh sách. Vui lòng thử lại sau."
                status="error"
              />
            );
          },
        });
      }
    };
    getSubscriptionUsing();
  }, [subscription]);
  return (
    <>
      <Box
        bgColor="#fff"
        width="90%"
        maxW="90%"
        maxH="95%"
        minH="90%"
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
        {subscription ? (
          <Box alignItems="flex-start" width="100%">
            <VStack space="5">
              <Heading size="md">Gói đang sử dụng</Heading>
              <HStack justifyContent="space-between" width="full">
                <Text color={appColor.textSecondary}>Tên gói</Text>
                <Text color={appColor.textSecondary}>
                  {subscription.planName}
                </Text>
              </HStack>

              <HStack justifyContent="space-between" width="full">
                <Text color={appColor.textSecondary}>Thời hạn</Text>
                <Text color={appColor.textSecondary}>
                  {subscription.duration + "day"}
                </Text>
              </HStack>

              <HStack width="full">
                <Button
                  width="full"
                  onPress={() => {
                    navigation.navigate("SubscriptionDetail", {
                      subscriptionId: 1,
                    });
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
        ) : (
          <Box alignItems="flex-start" width="100%">
            <VStack space="5">
              <Heading size="md">
                Bạn chưa mua gói hoặc gói của bạn đã hết hạn.
              </Heading>
              <HStack width="full" mt={64}>
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
        )}
      </Box>
    </>
  );
}
