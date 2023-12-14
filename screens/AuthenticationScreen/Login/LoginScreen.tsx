import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { useAppDispatch } from "../../../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserInfo } from "../../../types";
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
  Modal,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginRequest, ILoginResponse } from "../../../types";
import * as yup from "yup";
import { LoginScreenProps } from "../../../Navigator/StackNavigator";
import { login } from "../../../store";
import { authApi } from "../../../services/auth.services";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
// Thư viện dùng để kết nối với Facebook
import { Platform } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
GoogleSignin.configure({
  webClientId:
    "698964272341 - u24tokvut5fd5heu7vqmh58c3qmd6kfv.apps.googleusercontent.com",
});
let providerStr: string = "";

const schema: yup.ObjectSchema<ILoginRequest> = yup
  .object({
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
      .required("password required"),
  })
  .required();

const Login: React.FC<LoginScreenProps> = ({
  navigation,
  route,
}: LoginScreenProps) => {
  const [isChecked, setIsChecked] = React.useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userIdFromProvider, setUserIdFromProvider] = useState<string>("");
  const [providerLogin, setProviderLogin] = useState<string>("");
  const [emailFromProvider, setEmailFromProvider] = useState<string | null>(""); // email được chọn để đăng ký tài khoản
  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailChoose, setEmailChoose] = useState<string>(""); // email được chọn để đăng ký tài khoản
  // handle loading state
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const { setLogin } = route.params;
  const dispatch = useAppDispatch();
  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  async function revokeGoogleAccess() {
    try {
      await GoogleSignin.signOut();
      // Tiếp theo, thực hiện đăng nhập lại với Google
      onGoogleButtonPress()
        .then((e) => console.log(e))
        .catch((e) => console.log(e));
    } catch (error) {
      console.error("Không thể thu hồi quyền truy cập Google: ", error);
    }
  }

  async function onGoogleButtonPress() {
    providerStr = "google";
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn
      .then(async (userInfoFromProvider) => {
        console.log(userInfoFromProvider);
        if (userInfoFromProvider) {
          console.log(userInfoFromProvider);
          setUserIdFromProvider(userInfoFromProvider.user.uid);
          setProviderLogin(providerStr);
          // kiểm tra account có tồn tại, nếu có thì lưu thông tin user và token
          const res = await authApi.getUserByAccountId(
            userInfoFromProvider.user.uid,
            providerStr
          );
          // Nếu account tồn tại
          if (res.data?.token && res.data?.user) {
            // Tạo object userToStorage để lưu dữ liệu User vào storage, interface là IUserInfo
            const userToStorage: IUserInfo = {
              id: res.data.user.id,
              email: res.data.user.email,
              isInputPassword: res.data.user.isInputPassword,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              moduleId: res.data.user.moduleId,
            };
            // Tạo object userToReduxStore để lưu dữ liệu User vào redux, interface là ILoginResponse
            const userToReduxStore: ILoginResponse = {
              user: userToStorage,
              token: res.data.token,
            };
            // Lưu thông tin user và token vào Async Storage
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(userToStorage));
            // Dispatch dữ liệu lên redux
            dispatch(login(userToReduxStore));
            // setToken để render lại màn hình
            setLogin(res.data.user, res.data.token);
          } else {
            setEmailFromProvider(userInfoFromProvider.user.email);
            // open modal here
            setShowModal(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function onFacebookButtonPress() {
    providerStr = "facebook";
    // lấy thông tin user từ provider
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    await LoginManager.logInWithPermissions(["public_profile", "email"]);
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) return;
    const facebookCredentials = FacebookAuthProvider.credential(
      data.accessToken
    );
    const auth = getAuth();
    const userSignIn = signInWithCredential(auth, facebookCredentials);
    userSignIn
      .then(async (userInfoFromProvider) => {
        console.log(userInfoFromProvider);
        setUserIdFromProvider(userInfoFromProvider.user.uid);
        setProviderLogin(providerStr);
        // kiểm tra account có tồn tại, nếu có thì lưu thông tin user và token
        const res = await authApi.getUserByAccountId(
          userInfoFromProvider.user.uid,
          providerStr
        );
        // Nếu account tồn tại
        if (res.data?.token && res.data?.user) {
          // Tạo object userToStorage để lưu dữ liệu User vào storage, interface là IUserInfo
          const userToStorage: IUserInfo = {
            id: res.data.user.id,
            email: res.data.user.email,
            isInputPassword: res.data.user.isInputPassword,
            firstName: res.data.user.firstName,
            lastName: res.data.user.lastName,
            moduleId: res.data.user.moduleId,

            // dữ liệu tạm thời
            // Check isInputPassword: lấy từ API về
            // nếu là False: Hiện modal Nhập mật khẩu
            // gọi đến API tạo mật khẩu mới (nói anh Bão)
            // Nói thêm: Khi cập nhật mật khẩu mới thì phải để isInputPassword thành true
          };
          // Tạo object userToReduxStore để lưu dữ liệu User vào redux, interface là ILoginResponse
          const userToReduxStore: ILoginResponse = {
            user: userToStorage,
            token: res.data.token,
          };
          // Lưu thông tin user và token vào Async Storage
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("user", JSON.stringify(userToStorage));
          // Dispatch dữ liệu lên redux
          dispatch(login(userToReduxStore));
          // setToken để render lại màn hình
          setLogin(res.data.user, res.data.token);
        } else {
          setEmailFromProvider(userInfoFromProvider.user.email);
          // open modal here
          setShowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const sendEmailVerifyLinkAccount = async (email: string) => {
    try {
      console.log(`Gửi mail xác thực đến  `, email);
      const res = await authApi.sendEmailVerifyUser({
        email,
        key: userIdFromProvider,
        provider: providerLogin,
      });
      if (res.status) {
        navigation.navigate("ValidateNotification", {
          setLogin: setLogin,
        });
        setShowModal(false);
      }
      setEmailChoose("");
      navigation.navigate("ValidateNotification", { setLogin });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Function handle login with email and password
   * if login success: save info in asyncStorage, dispatch data to reducer and navigate to Profile
   * else: export notifications and errors
   */
  const onSubmit: SubmitHandler<ILoginRequest> = async (
    data: ILoginRequest
  ) => {
    setIsLoading(true);
    await authApi
      .login(data)
      .then(async (res) => {
        if (res.status && res.data) {
          // Dispatch data to reducer
          dispatch(login(res.data));
          // save data in async storage
          await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
          await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
          // Set lại token để vào trang homepage
          setLogin(res.data.user, res.data.token);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    setIsLoading(false);
  };

  return (
    <Center flex="1" px="3">
      <LoadingSpinner showLoading={isLoading} setShowLoading={setIsLoading} />
      <Center w="100%">
        <Box safeArea p="2" py="8" w="100%">
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
            <HStack space={1} alignItems="center" justifyContent="center">
              <Text>hoặc</Text>
              <Link
                isUnderlined={false}
                _text={{
                  _light: {
                    color: "primary.300",
                  },
                }}
                onPress={() => navigation.navigate("Register", { setLogin })}
              >
                Tạo tài khoản mới
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
                    placeholder="Nhập địa chỉ Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    fontSize={13}
                    InputLeftElement={
                      <Icon as={<Entypo name="email" />} ml="3" />
                    }
                  />
                )}
                name="email"
              />
              {errors.email ? (
                <Text color="error.400">{errors.email.message}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Nhập mật khẩu"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    fontSize={13}
                    InputLeftElement={
                      <Icon as={<AntDesign name="lock" />} ml="3" />
                    }
                  />
                )}
                name="password"
              />
              {errors.password ? (
                <Text color="error.400">{errors.password.message}</Text>
              ) : null}
            </FormControl>
            <HStack justifyContent="space-between">
              <Checkbox
                value="one"
                isChecked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                _text={{
                  fontSize: "14px",
                  ml: "0",
                }}
              >
                Lưu thông tin đăng nhập
              </Checkbox>
              <Link
                _text={{
                  fontSize: "14",
                  fontWeight: "500",
                  color: "primary.300",
                }}
                alignSelf="center"
              >
                Quên mật khẩu?
              </Link>
            </HStack>
            <Button mt="2" onPress={handleSubmit(onSubmit)}>
              <Text ml={2} fontWeight="medium" style={{ color: "white" }}>
                Đăng nhập
              </Text>
            </Button>
            <Text
              fontSize="14"
              color="black"
              alignSelf="center"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Hoặc đăng nhập bằng tài khoản
            </Text>
            <HStack space={5} alignItems="center" justifyContent="center">
              <Button
                height={50}
                width={50}
                justifyContent="center"
                alignItems="center"
                bg="white" // Set the background color to white
                borderWidth={1} // Set the border width
                borderColor="primary.300" // Set the border color to gray
                borderRadius="full" // Set the border radius
                onPress={revokeGoogleAccess}
              >
                <HStack space={2} alignItems="center">
                  <Image
                    style={styles.logoIcon}
                    contentFit="cover"
                    source={require("../../../assets/google.png")}
                  />
                </HStack>
              </Button>
              <Button
                height={50}
                width={50}
                justifyContent="center"
                alignItems="center"
                bg="white" // Set the background color to white
                borderWidth={1} // Set the border width
                borderColor="primary.300" // Set the border color to gray
                borderRadius="full" // Set the border radius
                onPress={onFacebookButtonPress}
              >
                <HStack space={2} alignItems="center">
                  <Image
                    style={styles.logoIcon}
                    contentFit="cover"
                    source={require("../../../assets/facebook.png")}
                  />
                </HStack>
              </Button>
              <Button
                height={50}
                width={50}
                justifyContent="center"
                alignItems="center"
                bg="white" // Set the background color to white
                borderWidth={1} // Set the border width
                borderColor="primary.300" // Set the border color to gray
                borderRadius="full" // Set the border radius
                onPress={revokeGoogleAccess}
              >
                <HStack alignItems="center" justifyContent="center">
                  <Image
                    style={styles.logoIcon}
                    contentFit="cover"
                    source={require("../../../assets/microsoft.png")}
                  />
                </HStack>
              </Button>
            </HStack>
          </VStack>
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              Tài khoản của bạn chưa được liên kết, vui lòng chọn email muốn
              liên kết
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>
                  Chọn Email để liên kết tài khoản
                </FormControl.Label>
                <Button
                  onPress={() => {
                    // Implement sending email here
                    if (emailFromProvider) {
                      setEmailChoose(emailFromProvider);
                      sendEmailVerifyLinkAccount(emailFromProvider);
                    }
                  }}
                >
                  <Text>{emailFromProvider}</Text>
                </Button>
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Hoặc nhập Email của bạn</FormControl.Label>
                <Input
                  placeholder="Nhập tài khoản bạn muốn liên kết"
                  value={emailChoose}
                  onChangeText={(emailChoose) => {
                    setEmailChoose(emailChoose);
                  }}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Thoát
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                    sendEmailVerifyLinkAccount(emailChoose);
                  }}
                >
                  Tiếp tục
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </Center>
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    width: 20,
    height: 20,
  },
});

export default Login;
