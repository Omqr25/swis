import { Box, Text } from "@chakra-ui/react";
import Branches from "../../entities/Branches";

interface Props {
  Branch: Branches | null;
}

export const BranchInfo = ({ Branch }: Props) => {
  return (
    <Box textAlign={"center"} m={2} color={"white"}>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          NAME :
        </Text>{" "}
        {Branch?.name}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          CODE :
        </Text>{" "}
        {Branch?.code}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          ADDRESS :
        </Text>{" "}
        {Branch?.address}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          PHONE :
        </Text>{" "}
        {Branch?.phone}
      </Text>
      <Text p={2}>
        <Text fontWeight={"bold"} color={"green"}>
          MAINBRANCH_ID :
        </Text>{" "}
        {Branch?.main_branch?.name}
      </Text>
    </Box>
  );
};
