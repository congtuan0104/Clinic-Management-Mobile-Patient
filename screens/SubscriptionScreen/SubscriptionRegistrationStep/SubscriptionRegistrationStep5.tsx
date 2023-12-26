import { Box, HStack, Heading, VStack, Text, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { appColor } from "../../../theme";

export const StepFiveScreen = (props: any) => {
  const { changePosition } = props;
  return (
    <Box minH="100%" maxH="100%" justifyContent="center" alignItems="center">
      <VStack
        space={4}
        justifyContent="center"
        alignItems="center"
        borderBottomWidth={3}
        borderBottomColor="#ededed"
        width="full"
      >
        <Ionicons
          name="md-checkmark-circle-outline"
          size={70}
          color={appColor.primary}
        />
        <Heading>Thanh toán thành công!</Heading>
        <Heading fontSize="45">250.000đ</Heading>
      </VStack>
      <VStack space={5} width="full" mt={5}>
        <HStack justifyContent="space-between">
          <Text>Mã đơn</Text>
          <Text>47852zsf4sd</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Số tài khoản</Text>
          <Text>4707432333333</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Thời gian</Text>
          <Text>25/11/2023, 12:44:30</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Phương thức</Text>
          <Text>VNPay</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Tên người mua</Text>
          <Text>Nguyễn Nhật Khang</Text>
        </HStack>
      </VStack>
      <HStack
        mt="20%"
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
    </Box>
  );
};
