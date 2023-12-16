import { View, Text } from "react-native";
import React, { useState } from "react";
import { CreateChattingGroupScreenProps } from "../../Navigator/ChattingNavigator";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  Input,
  Select,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICreateGroupChatRequest } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { appColor } from "../../theme";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { chatService } from "../../services";

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
      maxMember: 50,
      type: "group",
    },
  });
  const userInfo = useAppSelector(userInfoSelector);
  // Sample data
  const data = [
    {
      key: "24d0a9fd-1555-483c-a390-3fa556302d6a",
      value: "N Tuan",
    },
    {
      key: "37386997-de3b-4b78-baf5-884bcf57f1ff",
      value: "Nhat C",
    },
    {
      key: "4200b0a2-11a7-4e2b-bcd0-3cc8649a124f",
      value: "Ng Van B",
    },
    {
      key: "42d0c01b-a319-4021-8fe8-26ddaad14072",
      value: "Nguyen Tran Minh",
    },
    {
      key: "4dcd8b08-78e0-46c6-9f98-f36a881a93f8",
      value: "Nguyen Van A",
    },
    {
      key: "54fd31b6-896c-4944-9fc1-594f0156b821",
      value: "Nguyen Tran Minh Quang",
    },
    {
      key: "8a89f1f5-73b3-48c6-adbf-10b024e34dc6",
      value: "Nguyen Tran Minh",
    },
    {
      key: "9fc5002b-b9f9-4192-85e8-f95dbcfe6f6f",
      value: "Nguyen Tran Minh",
    },
    {
      key: "efe91e19-c832-4d34-ae5c-956b23ad6b40",
      value: "Nguyen Ha",
    },
    {
      key: "e7865f1d-49b4-4102-aeb9-f644c9f22873",
      value: "Nguyen Nhat Khang",
    },
  ];

  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Xử lí việc gọi API tạo nhóm
  const onSubmit = async (data: ICreateGroupChatRequest) => {
    setIsLoading(true);
    const dataSubmit = {
      ...data,
      userList: [...selected, userInfo?.id],
    };
    console.log(dataSubmit);
    // Call API to create chat group
    const response = await chatService.createGroupChat(dataSubmit);
    // console.log(response.data);
    if (response.status) {
    } else {
    }
    setIsLoading(false);
    navigation.navigate("ChattingGroupList");
  };

  return (
    <Center flex={1}>
      <VStack width="90%" space={5} mx="3" maxW="500px">
        <Heading size="xl" mb="4" alignSelf="center">
          Tạo nhóm mới
        </Heading>
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
        {/* <FormControl isRequired isInvalid={errors.maxMember ? true : false}>
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
        </FormControl> */}
        <MultipleSelectList
          setSelected={(val: any) => setSelected(val)}
          onSelect={() => console.log(selected)}
          data={data}
          label="Danh sách thành viên"
          save="key"
          notFoundText="Không có dữ liệu"
          placeholder="Thêm thành viên"
          searchPlaceholder="Tìm kiếm thành viên"
          maxHeight={300}
          labelStyles={{
            fontWeight: "normal",
          }}
          badgeStyles={{
            backgroundColor: appColor.backgroundPrimary,
            margin: -3,
            paddingVertical: 3,
            paddingHorizontal: 10,
          }}
          checkBoxStyles={{
            borderColor: appColor.backgroundPrimary,
            borderWidth: 1,
          }}
          dropdownItemStyles={{
            paddingVertical: 4,
          }}
          dropdownTextStyles={{
            fontSize: 14,
          }}
        />
        <Button onPress={handleSubmit(onSubmit)}>Tạo nhóm</Button>
        <Button
          onPress={() => {
            navigation.navigate("ChattingGroupList");
          }}
        >
          Quay lại
        </Button>
      </VStack>
      <LoadingSpinner showLoading={isLoading} setShowLoading={setIsLoading} />
    </Center>
  );
}
