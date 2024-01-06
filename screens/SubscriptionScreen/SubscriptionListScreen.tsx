import {
  Box,
  Button,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { SubscriptionListScreenProps } from "../../Navigator/SubscriptionNavigator";
import { appColor } from "../../theme";
import React, { useEffect, useState } from "react";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { clinicService } from "../../services";
import { planService } from "../../services/plan.services";
export default function SubscriptionListScreen({
  navigation,
  route,
}: SubscriptionListScreenProps) {
  const [planList, setPlanList] = useState<any>([]);
  // Call API to get all subscriptions
  useEffect(() => {
    const getPlanList = async () => {
      try {
        const response = await planService.getPlanList();
        if (response.status) {
          setPlanList(response.data);
        } else {
          setPlanList([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlanList();
  }, []);

  const handleBuyingSubscription = (planId: any) => {
    // find plan by planId
    const planData = planList.find((plan: any) => plan.id === planId);
    navigation.navigate("SubscriptionRegistration", { planData: planData });
  };

  return (
    <VStack space={5} my={5}>
      <Box width="90%" alignSelf="center">
        <Heading>Danh sách gói hiện có</Heading>
      </Box>
      <ScrollView
        width="90%"
        alignSelf="center"
        minH="80%"
        maxH="80%"
        backgroundColor={appColor.white}
        borderRadius={20}
      >
        <VStack space={5} width="90%" alignSelf="center" my={5}>
          {planList.map((plan: any, index: any) => {
            return (
              <Box
                key={index}
                backgroundColor="#DAD9FF"
                borderRadius={10}
                p={3}
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack>
                    <Text fontSize={20}>{plan.planName}</Text>
                    <Text>Thời hạn: {plan.duration} ngày</Text>
                    <Text>Giá tiền: {plan.currentPrice}đ</Text>
                  </VStack>
                </HStack>
                <Pressable
                  alignSelf="flex-end"
                  onPress={() => {
                    handleBuyingSubscription(plan.id);
                  }}
                >
                  <FontAwesome
                    name="arrow-circle-right"
                    size={35}
                    color={appColor.primary}
                  />
                </Pressable>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
      <Button
        mt={6}
        width="90%"
        alignSelf="center"
        onPress={() => {
          navigation.navigate("SubscriptionDashboard");
        }}
      >
        Quay lại
      </Button>
    </VStack>
  );
}
