import React from "react";
import { RegisterScreenProps } from "../types/types";
import {
  Box,
  Heading,
  Stack,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  WarningOutlineIcon,
  Text,
} from "native-base";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterInfo } from "./types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Must be email"),
  password: yup.string().required("Password is required").min(8, 'At least 8 characters'),
  confirmPassword: yup.string().required("Password is required").min(8, 'At least 8 characters').oneOf([yup.ref('password')], 'Password does not match'),
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
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={2} mt={5}>
          <FormControl isRequired isInvalid={errors.email ? true : false}>
              <FormControl.Label _text={{color:'muted.700', fontSize:'sm', fontWeight: 600}}>Email</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="text"
                    placeholder="email"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="email"
                defaultValue=""
              />
              <FormControl.HelperText>
                Must be a valid email.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email && <Text>{errors.email.message}</Text>}
              </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.password ? true : false}>
              <FormControl.Label _text={{color:'muted.700', fontSize:'sm', fontWeight: 600}}>Password</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="password"
                    placeholder="password"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="password"
                defaultValue=""
              />
              <FormControl.HelperText>
                Must be a valid password and at least 8 characters.
              </FormControl.HelperText>
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
              <FormControl.Label _text={{color:'muted.700', fontSize:'sm', fontWeight: 600}}>Confirm Password</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="password"
                    placeholder="confirmPassword"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="confirmPassword"
                defaultValue=""
              />
              <FormControl.HelperText>
                Must be a valid password and at least 8 characters and same with password.
              </FormControl.HelperText>
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
            colorScheme="cyan"
            _text={{
              color: "white",
            }}
          >
            Submit
          </Button>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default RegisterScreen;
