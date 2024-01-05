import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import { SubscriptionDashboardScreenProps } from "../../Navigator/SubscriptionNavigator";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { appColor } from "../../theme";
import { useEffect, useState } from "react";
import ToastAlert from "../../components/Toast/Toast";
import { clinicService } from "../../services";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { openBrowserAsync } from "expo-web-browser";
import { ClinicInfoDashboardScreenProps } from "../../Navigator/ClinicInfoNavigator";

export default function ClinicInfoDashboardScreen({
  navigation,
  route,
}: ClinicInfoDashboardScreenProps) {
  const toast = useToast();
  const { clinic } = route.params;
  return (
    <>
      <Text>Clinic Info Name: {clinic.name} </Text>
    </>
  );
}
