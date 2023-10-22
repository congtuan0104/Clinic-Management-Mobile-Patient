import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import {
  Checkbox,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInfo } from "./type";
import * as yup from "yup";

const schema: yup.ObjectSchema<LoginInfo> = yup
  .object({
    username: yup.string().required("Email không được để trống").email('Email không hợp lệ'),
    password: yup
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
      .required("password required"),
  })
  .required();

const Login = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginInfo> = (data) => {
    console.log(data);
    // call api...
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="100%" /* maxW="500" */>
        <Heading
          size="xl"
          fontWeight="bold"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Đăng nhập
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="18"
              color="black"
              _dark={{
                color: "warmGray.200",
              }}
            >
              hoặc{" "}
            </Text>
            <Link
              _text={{
                color: "#1890ff",
                fontWeight: "medium",
                fontSize: "18",
              }}
              href="#"
            >
              Tạo mới tài khoản
            </Link>
          </HStack>
        </Heading>

        <VStack space={3} mt="5">
          <FormControl /* isInvalid={!!errors.email} */>
            <Controller
              control={control}
              rules={
                {
                  // required: true,
                }
              }
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            {errors.username ? <Text style={{ color: "red" }}>{errors.username.message}</Text> : null}
          </FormControl>
          <FormControl>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password ? <Text style={{ color: "red" }}>{errors.password.message}</Text> : null}
          </FormControl>
          <Checkbox
            value="one"
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            my={2}
            colorScheme="blue"
          >
            Ghi nhớ thông tin đăng nhập
          </Checkbox>
          <Button
            mt="2"
            colorScheme="indigo"
            style={styles.buttonStyle}
            onPress={handleSubmit(onSubmit)}
          >
            <Text ml={2} fontWeight="medium" style={{ color: "white" }}>
              Đăng nhập
            </Text>
          </Button>
          <Button
            mt="2"
            justifyContent="center"
            alignItems="center"
            bg="white" // Set the background color to white
            borderWidth={1} // Set the border width
            borderColor="gray.500" // Set the border color to gray
            borderRadius="md" // Set the border radius
            p={2} // Add padding to the button
          >
            <HStack space={2} alignItems="center">
              <Image
                style={styles.logoIcon}
                contentFit="cover"
                source={require("../assets/logo.png")}
              />
              <Text ml={2} fontWeight="regular">
                Đăng nhập với Google
              </Text>
            </HStack>
          </Button>
        </VStack>
        <Link
          _text={{
            fontSize: "14",
            fontWeight: "500",
            color: "#1890ff",
          }}
          alignSelf="center"
          mt="3"
        >
          Quên mật khẩu?
        </Link>
      </Box>
    </Center>
  );
};

export default () => {
  return (
      <Center flex={1} px="3">
        <Login />
      </Center>    
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: "#1890ff",
    fontWeight: "bold",
    color: "white",
  },
});
