import { Box, HStack, Heading, VStack, Text, Button } from "native-base";
import { PlanDataCard } from "../../../components/PlanDataCard/PlanDataCard";

export const StepTwoScreen = (props: any) => {
  const { planData, changePosition } = props;
  return (
    <VStack maxH="100%" minH="100%" space={5}>
      <Heading>Bước 2: Xác nhận đơn hàng</Heading>
      <PlanDataCard planData={planData} />
      <VStack space={5}>
        <HStack justifyContent="space-between">
          <Text>Tiền gói</Text>
          <Text>250.000đ</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Phí</Text>
          <Text>25.000đ</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Giảm giá</Text>
          <Text>10%</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Tổng tiền</Text>
          <Text>205.000đ</Text>
        </HStack>
      </VStack>
      <HStack
        mt="50%"
        width="full"
        justifyContent="space-between"
        alignSelf="center"
      >
        <Button
          borderRadius={20}
          onPress={() => {
            changePosition(false);
          }}
        >
          Quay lại
        </Button>
        <Button
          borderRadius={20}
          onPress={() => {
            changePosition(true);
          }}
        >
          Tiếp tục
        </Button>
      </HStack>
    </VStack>
  );
};
