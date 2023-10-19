import React from "react";
import {View, Text, TextInput, TouchableOpacity, Button} from "react-native";
import { LoginScreenProps } from '../types/types';
import { useForm, Controller, SubmitHandler} from "react-hook-form"
import {LoginInfo} from './types'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
const schema: yup.ObjectSchema<LoginInfo>= yup.object({
  username:yup.string().required('username required'),
  password:yup.string().min(8, 'At least 8 characters').required('password required'),
}).required()

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
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
  })
  const onSubmit:SubmitHandler<LoginInfo> = (data) => {
    console.log(data)
    // call api...
  }

  return (
    <View>
      <Controller
        control={control}
        rules={{
          // required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username?<Text>{errors.username.message}</Text>:null}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password?<Text>{errors.password.message}</Text>:null}
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <Button title="Register" onPress={()=>navigation.navigate('Register')}/>
    </View>
  )
};

export default LoginScreen;