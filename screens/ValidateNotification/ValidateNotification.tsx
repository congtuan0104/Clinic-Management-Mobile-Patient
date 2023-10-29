import { Text, Button, View } from "native-base";
import { ValidateNotificationProps } from "../../types";

const ValidateNotification: React.FC<ValidateNotificationProps> = ({
  navigation,
  route,
}: ValidateNotificationProps) => {
  const { setToken } = route.params;
  return (
    <View>
      <Text>Hãy vào email của bạn để xác thực tài khoản</Text>
      <Button
        onPress={() => {
          navigation.navigate("Login", { setToken: setToken });
        }}
      >
        Quay lại trang đăng nhập
      </Button>
    </View>
  );
};

export default ValidateNotification;
