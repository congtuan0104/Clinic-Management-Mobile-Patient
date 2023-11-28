import { Text, Button, View, Box } from "native-base";
import { ValidateNotificationProps } from "../../types";

const ValidateNotification: React.FC<ValidateNotificationProps> = ({
  navigation,
  route,
}: ValidateNotificationProps) => {
  const { setToken, email } = route.params;
  return (
    <Box safeArea>
      <View>
        <Text>Một tin nhắn xác thực đã được gửi đến email {email}</Text>
        <Text>Vui lòng xác thực tài khoản trước khi đăng nhập</Text>
        <Button
          onPress={() => {
            navigation.navigate("Login", { setToken: setToken });
          }}
        >
          Quay lại trang đăng nhập
        </Button>
      </View>
    </Box>
  );
};

export default ValidateNotification;
