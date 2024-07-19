import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiMap } from "react-icons/bi";
import Branches from "../../entities/Branches";
import useBranchStore from "../../stores/branchesStore";
import CustomModal from "../Modal";
import { BranchForm } from "./BranchForm";
import { BranchInfo } from "./BranchInfo";
import useSub from "../../hooks/useSub";
import DeleteC from "../Delete";
import { MyDarkColor } from "../../constants";
import { useTranslation } from "react-i18next";
import { Error } from "../Error";
import { FaEdit } from "react-icons/fa";
export const SubBranch = () => {
  const branch = useBranchStore((s) => s.branch);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [buttonLabel, setButtonLabel] = useState("");

  const [SubBranchInfo, setSubBranchInfo] = useState<Branches>({
    name: "",
    code: "",
    phone: "",
    address: "",
    main_branch: { id: 0, name: "" },
  });

  const [showForm, setShowForm] = useState(false);

  const { data, error, isLoading } = useSub<Branches>(branch.id , "branches/indexSubBranch");

  const { colorMode } = useColorMode();

  const { t } = useTranslation();
  if (!branch.id) return <></>;

  const handleSubBranch = (SubBranch: Branches) => {
    if (onOpen && SubBranch.name) {
      setShowForm(false);
      setButtonLabel(SubBranch.name);
      setSubBranchInfo(SubBranch);
      onOpen();
    }
  };

  const handleEditSubBranch = (SubBranch: Branches) => {
    if (onOpen) {
      setShowForm(true);
      setButtonLabel("Edit");
      setSubBranchInfo(SubBranch);
      onOpen();
    }
  };
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return (
    <Box
      m={4}
      bg={"gray.100"}
      borderRadius={20}
      overflowY={"auto"}
      maxHeight="590px"
      bgColor={colorMode === "dark" ? MyDarkColor : "white"}
    >
      <Heading fontSize={30} pb={4} textAlign={"center"}>
        {branch.name}
      </Heading>
      <Text fontSize={20} pl={4} pb={2}>
        <Icon as={BiMap} /> <b>{t("Address")}</b> : {branch.address}
      </Text>
      <Heading fontSize={30} pb={4} textAlign={"center"}>
        {t("SubBranches")}
      </Heading>
      {data?.data.map((b) => (
        <Box
          key={b.id}
          borderRadius={20}
          bg={"gray.200"}
          pl={4}
          pb={4}
          m={3}
          _hover={{ bg: "gray.500" }}
          bgColor={colorMode === "dark" ? MyDarkColor : "white"}
        >
          <Flex align="center" pt={3} pr={2} onClick={() => handleSubBranch(b)}>
            <Text>{b.name}</Text>
            <Spacer />
            <Button
              leftIcon={<FaEdit />}
              colorScheme="blue"
              mr={2}
              onClick={(e) => {
                e.stopPropagation();
                handleEditSubBranch(b);
              }}
            >
              {t("Edit")}
            </Button>
            {b.id && <DeleteC ID={b.id} target="branches" type="Button" />}
          </Flex>
        </Box>
      ))}
      <CustomModal buttonLabel={buttonLabel} isOpen={isOpen} onClose={onClose}>
        {showForm ? (
          <BranchForm
            isEdit={true}
            ID={SubBranchInfo.id ? SubBranchInfo.id : 0}
          />
        ) : (
          <BranchInfo Branch={SubBranchInfo} />
        )}
      </CustomModal>
    </Box>
  );
};
