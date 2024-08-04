import { Box, Text } from "@chakra-ui/react";
import User from "../../entities/User";
import { useTranslation } from "react-i18next";


interface Props {
    User : User;
}

export const UserInfo = ({User} : Props) => {
    const {t} = useTranslation();
  return (
    <Box textAlign={"center"} m={2} color={"white"}>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Name")} :
        </Text>{" "}
        {User.name}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Phone")} :
        </Text>{" "}
        {User.phone}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Email")} :
        </Text>{" "}
        {User.email}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Code")} :
        </Text>{" "}
        {User.code}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Contact_Email")} :
        </Text>{" "}
        {User.contact_email}
      </Text>
      </Box>
  );
};
