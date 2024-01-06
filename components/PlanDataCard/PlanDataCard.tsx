import { Box, HStack, VStack, Text } from "native-base";

export const PlanDataCard = (props: any) => {
  const { planData } = props;
  return (
    <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
      <HStack alignItems="center" justifyContent="space-between">
        <VStack>
          <Text fontSize={20}>{planData.planName}</Text>
          <Text>Thời hạn: {planData.duration} ngày</Text>
          <Text>Giá:{planData.currentPrice}đ</Text>
        </VStack>
      </HStack>
    </Box>
  );
};
