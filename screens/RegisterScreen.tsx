import React from "react";
import { View, Text } from "react-native";
import { RegisterScreenProps } from '../types/types';
import { NativeBaseProvider, Box } from "native-base";

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  )
};

export default RegisterScreen;