import { View, Text } from "react-native";
import React from "react";
import { CreateChattingGroupScreenProps } from "./ChattingScreen";
import {
  Button,
  Center,
  CheckIcon,
  FormControl,
  Input,
  Select,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICreateGroupChatRequest } from "../../../types";
import { Controller, useForm } from "react-hook-form";

// Validate đăng nhập
const schema: yup.ObjectSchema<ICreateGroupChatRequest> = yup.object({
  groupName: yup.string().required("Tên nhóm không được để trống"),
  maxMember: yup
    .number()
    .required("Số thành viên tối đa không được để trống")
    .min(2, "Số thành viên trong nhóm phải lớn hơn hoặc bằng 2"),
  type: yup.string().required("Loại nhóm không được để trống"),
});

export default function CreateChattingGroupScreen({
  navigation,
  route,
}: CreateChattingGroupScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateGroupChatRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      groupName: "",
      maxMember: 2,
      type: "1",
    },
  });

  // Xử lí việc gọi API tạo nhóm
  const onSubmit = async (data: ICreateGroupChatRequest) => {
    console.log(data);
  };

  return (
    <Center flex={1}>
      <VStack width="90%" mx="3" maxW="300px">
        <FormControl isRequired isInvalid={errors.groupName ? true : false}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Tên nhóm
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="text"
                placeholder="Nhập tên nhóm của bạn"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="groupName"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.groupName && <Text>{errors.groupName.message}</Text>}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.maxMember ? true : false}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Số lượng tối đa
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="numeric"
                type="text"
                placeholder="Nhập số lượng thành viên tối đa của nhóm"
                onChangeText={onChange}
                value={value.toString()}
                onBlur={onBlur}
              />
            )}
            name="maxMember"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.maxMember && <Text>{errors.maxMember.message}</Text>}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.type ? true : false}>
          <FormControl.Label>Chọn loại nhóm</FormControl.Label>
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                minWidth="200"
                placeholder="Chọn loại nhóm"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                onValueChange={(value) => onChange(value)}
              >
                <Select.Item label="Nhóm chat" value="2" />
                <Select.Item label="Nhóm 1 - 1" value="1" />
              </Select>
            )}
          />

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </FormControl>
        <Button onPress={handleSubmit(onSubmit)} mt="5">
          Tạo nhóm
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("ChattingGroupList");
          }}
          mt="5"
        >
          Quay lại
        </Button>
      </VStack>
    </Center>
  );
}
