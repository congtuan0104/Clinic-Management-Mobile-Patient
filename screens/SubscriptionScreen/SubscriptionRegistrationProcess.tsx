import { SubscriptionRegistrationProcessScreenProps } from "../../Navigator/SubscriptionNavigator";
import { Box, Button, HStack, Pressable } from "native-base";
import StepIndicator from "@fcxlabs/react-native-step-indicator";
import { useEffect, useState } from "react";
import { appColor } from "../../theme";
import { AntDesign } from "@expo/vector-icons";
import { StepOneScreen } from "./SubscriptionRegistrationStep/SubscriptionRegistrationStep1";
import { StepTwoScreen } from "./SubscriptionRegistrationStep/SubscriptionRegistrationStep2";
import { StepThreeScreen } from "./SubscriptionRegistrationStep/SubscriptionRegistrationStep3";
import { StepFourScreen } from "./SubscriptionRegistrationStep/SubscriptionRegistrationStep4";
import { StepFiveScreen } from "./SubscriptionRegistrationStep/SubscriptionRegistrationStep5";
import { customStyles } from "../../config/stepIndicator";
export default function SubscriptionRegistrationProcessScreen({
  navigation,
  route,
}: SubscriptionRegistrationProcessScreenProps) {
  const labels = ["Thông tin", "Thành tiền", "Thanh toán", "Thành công"];
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("Zalopay");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { planData } = route.params;

  useEffect(() => {
    // Khi currentStep thay đổi, sẽ render lại màn hình tương ứng với step mới
    // Ví dụ: khi bạn muốn chuyển từ step 1 sang step 2, gọi hàm setCurrentStep(2)
    // Bạn có thể gọi hàm setCurrentStep ở đâu đó trong code của bạn để chuyển step
    // (ví dụ: khi người dùng nhấn nút Next)
    // setCurrentStep(2);
  }, [currentPosition]);

  const renderStepScreen = () => {
    switch (currentPosition) {
      case 0:
        return (
          <StepOneScreen planData={planData} changePosition={changePosition} />
        );
      case 1:
        return (
          <StepTwoScreen planData={planData} changePosition={changePosition} />
        );
      case 2:
        return (
          <StepThreeScreen
            planData={planData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            changePosition={changePosition}
          />
        );
      case 3:
        return <StepFourScreen changePosition={changePosition} />;
      case 4:
        return <StepFiveScreen changePosition={changePosition} />;
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
        maxH="80%"
        p={5}
      >
        {renderStepScreen()}
      </Box>
      {/* <HStack
        mt={10}
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
      </HStack> */}
      <Button
        mt={8}
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
