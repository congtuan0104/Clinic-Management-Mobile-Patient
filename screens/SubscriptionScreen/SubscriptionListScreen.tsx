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
import React from "react";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
export default function SubscriptionListScreen({
  navigation,
  route,
}: SubscriptionListScreenProps) {
  const handleBuyingSubscription = (subscriptionId: any) => {
    console.log(subscriptionId);
    navigation.navigate("SubscriptionRegistration");
  };
  return (
    <VStack space={5} my={5}>
      <Box width="90%" alignSelf="center">
        <Heading>Danh sách gói hiện có</Heading>
      </Box>
      <ScrollView
        width="90%"
        alignSelf="center"
        minH="3/5"
        maxH="4/5"
        backgroundColor={appColor.white}
        borderRadius={20}
      >
        <VStack space={5} width="90%" alignSelf="center" my={5}>
          <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Premium</Text>
                <Text>Thời hạn: 30 ngày</Text>
                <Text>Tối đa: 50 thành viên</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
            <Pressable
              alignSelf="flex-end"
              onPress={() => {
                handleBuyingSubscription("1");
              }}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={35}
                color={appColor.primary}
              />
            </Pressable>
          </Box>
          <Box backgroundColor="#FFF7D9" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Super</Text>
                <Text>Thời hạn: 30 ngày</Text>
                <Text>Tối đa: 50 thành viên</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
            <Pressable
              alignSelf="flex-end"
              onPress={() => {
                handleBuyingSubscription("1");
              }}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={35}
                color={appColor.primary}
              />
            </Pressable>
          </Box>
          <Box backgroundColor="#D9F8FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói VIP</Text>
                <Text>Thời hạn: 30 ngày</Text>
                <Text>Tối đa: 50 thành viên</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
            <Pressable
              alignSelf="flex-end"
              onPress={() => {
                handleBuyingSubscription("1");
              }}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={35}
                color={appColor.primary}
              />
            </Pressable>
          </Box>
          <Box backgroundColor="#D9F8FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói VIP</Text>
                <Text>Thời hạn: 30 ngày</Text>
                <Text>Tối đa: 50 thành viên</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
            <Pressable
              alignSelf="flex-end"
              onPress={() => {
                handleBuyingSubscription("1");
              }}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={35}
                color={appColor.primary}
              />
            </Pressable>
          </Box>
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
