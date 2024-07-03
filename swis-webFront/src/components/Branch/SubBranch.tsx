import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Spinner,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { BiMap } from "react-icons/bi";
import Branches from "../../entities/Branches";
import useBranchStore from "../../stores/branchesStore";
import CustomModal from "../Modal";
import { BranchForm } from "./BranchForm";
import { BranchInfo } from "./BranchInfo";
import useSubBranches from "../../hooks/useSubBrabches";
import DeleteC from "../Delete";
export const SubBranch = () => {
  const branch = useBranchStore((s) => s.branch);

  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const [buttonLabel, setButtonLabel] = useState("");

  const [SubBranchInfo , setSubBranchInfo] = useState<Branches>({name : '' , code: '' , phone: '', address:'',main_branch:{id:0,name:''}}); 

  const [showForm , setShowForm] = useState(false);

  const {data , isLoading} = useSubBranches(branch.id);

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
  if(isLoading)return <Spinner />
  return (
    <Box
      m={4}
      bg={"gray.100"}
      borderRadius={20}
      overflowY={"auto"}
      maxHeight="590px"
      color={'black'}
    >
      <Heading fontSize={30} pb={4} textAlign={"center"}>
        {branch.name}
      </Heading>
      <Text fontSize={20} pl={4} pb={2}>
        <Icon as={BiMap} /> <b>address</b> : {branch.address}
      </Text>
      <Heading fontSize={30} pb={4} textAlign={"center"}>
        SubBranches
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
        >
          <Flex align="center" pt={3} pr={2} onClick={() => handleSubBranch(b)}>
            <Text>{b.name}</Text>
            <Spacer />
            <Button
              colorScheme="blue"
              size="sm"
              mr={2}
              onClick={(e) => {
                e.stopPropagation();
                handleEditSubBranch(b);
              }}
            >
              Edit
            </Button>
            {b.id && <DeleteC ID={b.id} target="branches" />}
          </Flex>
        </Box>
      ))}
      <CustomModal buttonLabel={buttonLabel} isOpen={isOpen} onClose={onClose}>
        {showForm ? <BranchForm isEdit={true} ID={SubBranchInfo.id ? SubBranchInfo.id : 0}/> : <BranchInfo Branch={SubBranchInfo} />}
      </CustomModal>
    </Box>
  );
};
