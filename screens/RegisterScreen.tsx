import React from "react";
import { RegisterScreenProps } from "../types/type";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  NativeBaseProvider,
  WarningOutlineIcon,
  Text,
  Icon,
  Link,
  HStack,
} from "native-base";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterInfo } from "./type";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";

const schema = yup.object().shape({
  email: yup.string().required("Email còn trống").email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu còn trống")
    .min(8, "Mật khẩu tối thiểu 8 kí tự"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu còn trống")
    .min(8, "Mật khẩu tối thiểu 8 kí tự")
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không trùng khớp"),
});

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInfo>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterInfo) => {
    console.log("Submitting with:", data);
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Box safeArea flex={1} p={2} w="90%" mx="auto" justifyContent="center">
        <VStack>
          <Heading
            style={{ fontWeight: "bold" }}
            size="lg"
            color="muted.900"
            my="5"
          >
            Đăng ký
          </Heading>

          <Button
            variant="outline"
            colorScheme="info"
            leftIcon={<Icon as={AntDesign} name="google" size="sm" />}
            style={{ borderColor: "#0284c7" }}
            bg="light.50"
          >
            Đăng nhập với Google
          </Button>
          <Heading size="sm" color="muted.400" mt="3" mx="auto">
            Hoặc
          </Heading>
          <VStack space={2}>
            <FormControl isRequired isInvalid={errors.email ? true : false}>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Địa chỉ Email
              </FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="text"
                    placeholder="Địa chỉ email"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    bg="light.50"
                  />
                )}
                name="email"
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email && <Text>{errors.email.message}</Text>}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.password ? true : false}>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Mật khẩu
              </FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="password"
                    placeholder="Mật khẩu"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    bg="light.50"
                  />
                )}
                name="password"
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password && <Text>{errors.password.message}</Text>}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errors.confirmPassword ? true : false}
            >
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Xác nhận mật khẩu
              </FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    bg="light.50"
                  />
                )}
                name="confirmPassword"
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.confirmPassword && (
                  <Text>{errors.confirmPassword.message}</Text>
                )}
              </FormControl.ErrorMessage>
            </FormControl>
            <VStack space={2} mt={5}>
              <Button
                onPress={handleSubmit(onSubmit)}
                colorScheme="info"
                _text={{
                  color: "white",
                }}
              >
                Đăng kí
              </Button>
              <HStack space={1} alignItems="center" justifyContent="center">
                <Text>Đã có tài khoản?</Text>
                <Link
                  isUnderlined={false}
                  _text={{
                    _light: {
                      color: "info.600",
                    },
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Đăng nhập
                </Link>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default RegisterScreen;
