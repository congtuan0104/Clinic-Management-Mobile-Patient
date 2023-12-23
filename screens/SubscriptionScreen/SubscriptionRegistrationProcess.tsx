import { SubscriptionRegistrationProcessScreenProps } from "../../Navigator/SubscriptionNavigator";
import {
  Text,
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  VStack,
  View,
  Pressable,
  Radio,
  Spinner,
} from "native-base";
import StepIndicator from "@fcxlabs/react-native-step-indicator";
import { useEffect, useState } from "react";
import { appColor } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function SubscriptionRegistrationProcessScreen({
  navigation,
  route,
}: SubscriptionRegistrationProcessScreenProps) {
  const labels = ["Thông tin", "Thành tiền", "Thanh toán", "Thành công"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#605bff",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#605bff",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#605bff",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#605bff",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#605bff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#605bff",
  };
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { planData } = route.params;
  useEffect(() => {
    // Khi currentStep thay đổi, sẽ render lại màn hình tương ứng với step mới
    // Ví dụ: khi bạn muốn chuyển từ step 1 sang step 2, gọi hàm setCurrentStep(2)
    // Bạn có thể gọi hàm setCurrentStep ở đâu đó trong code của bạn để chuyển step
    // (ví dụ: khi người dùng nhấn nút Next)
    // setCurrentStep(2);
  }, [currentPosition]);

  const StepOneScreen = () => {
    return (
      <VStack space={5}>
        <Heading>Bước 1: Thông tin của bạn</Heading>
        <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <Text fontSize={20}>Gói Premium</Text>
              <Text>Thời hạn: 30 ngày</Text>
              <Text>Tối đa: 50 thành viên</Text>
            </VStack>
            <Text>250.000đ</Text>
          </HStack>
        </Box>
        <VStack space={5}>
          <HStack justifyContent="space-between">
            <Text>Họ tên</Text>
            <Text>Nguyễn Nhật Khang</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Email</Text>
            <Text>khangnl24112002@gmail.com</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>SĐT</Text>
            <Text>0123456789</Text>
          </HStack>
        </VStack>
      </VStack>
    );
  };
  const StepTwoScreen = () => {
    return (
      <VStack space={5}>
        <Heading>Bước 2: Xác nhận đơn hàng</Heading>
        <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <Text fontSize={20}>Gói Premium</Text>
              <Text>Thời hạn: 30 ngày</Text>
              <Text>Tối đa: 50 thành viên</Text>
            </VStack>
            <Text>250.000đ</Text>
          </HStack>
        </Box>
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
      </VStack>
    );
  };
  const StepThreeScreen = () => {
    return (
      <VStack space={5}>
        <Heading>Bước 3: Chọn hình thức thanh toán</Heading>
        <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <Text fontSize={20}>Gói Premium</Text>
              <Text>Thời hạn: 30 ngày</Text>
              <Text>Tối đa: 50 thành viên</Text>
            </VStack>
            <Text>250.000đ</Text>
          </HStack>
        </Box>

        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={paymentMethod}
          onChange={(nextValue) => {
            setPaymentMethod(nextValue);
          }}
        >
          <VStack space={5}>
            <Radio value="1">
              <Text>Zalo</Text>
            </Radio>
            <Radio value="2">
              <Text>Thanh toán qua thẻ tín dụng, ghi nợ</Text>
            </Radio>
            <Radio value="3">
              <Text>VN Pay</Text>
            </Radio>
          </VStack>
        </Radio.Group>
      </VStack>
    );
  };
  const StepFourScreen = () => {
    return (
      <Box justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    );
  };
  const StepFiveScreen = () => {
    return (
      <Box justifyContent="center" alignItems="center">
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
      </Box>
    );
  };
  const renderStepScreen = () => {
    switch (currentPosition) {
      case 0:
        return <StepOneScreen />;
      case 1:
        return <StepTwoScreen />;
      case 2:
        return <StepThreeScreen />;
      case 3:
        return <StepFourScreen />;
      case 4:
        return <StepFiveScreen />;
      default:
        return null;
    }
  };
  const changePosition = (foward: boolean) => {
    if ((currentPosition === 0 && !foward) || (currentPosition === 4 && foward))
      return;
    if (foward) {
      setCurrentPosition(currentPosition + 1);
    } else {
      setCurrentPosition(currentPosition - 1);
    }
  };
  return (
    <Box>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={4}
      />
      {/** Step card */}
      <Box
        alignSelf="center"
        width="90%"
        borderRadius={20}
        backgroundColor="#fff"
        minH="3/5"
        p={5}
      >
        {renderStepScreen()}
      </Box>
      <HStack
        mt={5}
        width="90%"
        justifyContent="space-between"
        alignSelf="center"
      >
        <Pressable
          onPress={() => {
            changePosition(false);
          }}
        >
          <AntDesign name="arrowleft" size={40} color={appColor.primary} />
        </Pressable>
        <Pressable
          onPress={() => {
            changePosition(true);
          }}
        >
          <AntDesign name="arrowright" size={40} color={appColor.primary} />
        </Pressable>
      </HStack>
      <Button
        mt={16}
        width="90%"
        alignSelf="center"
        onPress={() => {
          navigation.navigate("SubscriptionDashboard");
        }}
      >
        Thoát
      </Button>
    </Box>
  );
}
