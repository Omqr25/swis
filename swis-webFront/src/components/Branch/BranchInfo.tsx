import { Box, Text } from "@chakra-ui/react";
import Branches from "../../entities/Branches";
import { useTranslation } from "react-i18next";

interface Props {
  Branch: Branches | null;
}

export const BranchInfo = ({ Branch }: Props) => {
  const {t} = useTranslation();
  return (
    <Box textAlign={"center"} m={2} color={"white"}>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Name")} :
        </Text>{" "}
        {Branch?.name}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Code")} :
        </Text>{" "}
        {Branch?.code}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Address")} :
        </Text>{" "}
        {Branch?.address}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("Phone")} :
        </Text>{" "}
        {Branch?.phone}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          {t("MainBranch_id")} :
        </Text>{" "}
        {Branch?.main_branch?.name}
      </Text>
    </Box>
  );
};
