import { SubscriptionRegistrationScreenProps } from "../../Navigator/SubscriptionNavigator";
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
import { appColor } from "../../theme";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
export default function SubscriptionRegistrationScreen({
  navigation,
  route,
}: SubscriptionRegistrationScreenProps) {
  const { planData } = route.params;
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
      >
        <Box
          width="full"
          alignItems="center"
          justifyContent="center"
          height="1/6"
        >
          <HStack space={6} alignItems="center" justifyContent="center">
            <Fontisto
              name="shopping-package"
              size={40}
              color={appColor.primary}
            />
            <Heading fontSize={40} color={appColor.primary}>
              {planData.planName}
            </Heading>
          </HStack>
        </Box>
        <Box alignItems="flex-start" width="100%" minH="80">
          <VStack space="5">
            <HStack width="full">
              <Heading size="md">{planData.description}</Heading>
            </HStack>
            {planData.planOptions.map((option: any, index: any) => {
              return (
                <HStack
                  key={index}
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
                    {option.optionName}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </Box>
        <VStack alignItems="center">
          <Heading fontSize={50} color={appColor.primary}>
            {planData.currentPrice} đ
          </Heading>
          <Heading color={appColor.textSecondary}>
            {planData.duration} ngày
          </Heading>
        </VStack>
        <Box width="full" alignItems="center" py={3}>
          <Button
            onPress={() => {
              navigation.navigate("SubscriptionRegistrationProcess", {
                planData,
                paymentResult: null,
              });
            }}
            backgroundColor="secondary.300"
            width="full"
          >
            <Text fontSize={20} color={appColor.white}>
              MUA NGAY
            </Text>
          </Button>
        </Box>
      </Box>
      <Button
        mt={5}
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
