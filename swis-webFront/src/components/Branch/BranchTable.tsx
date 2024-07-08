import {
  Box,
  Button,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCode,
  AiOutlineEllipsis,
  AiOutlinePhone,
} from "react-icons/ai";
import { MyDarkColor } from "../../constants";
import useBranches from "../../hooks/useBranches";
import useBranchStore from "../../stores/branchesStore";
import DeleteC from "../Delete";
import { Error } from "../Error";
import CustomModal from "../Modal";
import { BranchForm } from "./BranchForm";
import { BranchTableSkeleton } from "./BranchTableSkeleton";

export const BranchTable = () => {
  const setBranch = useBranchStore((s) => s.setBranch);
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const branch = useBranchStore((s) => s.branch);
  const [BranchId , setBranchId] = useState(0);
  const {data , error ,  isLoading} = useBranches();
  const handleEditBranch = (id : number | undefined) => {
   if(onOpen && id){
   setBranchId(id);
   onOpen();
  }
};
  const {colorMode} = useColorMode();
  const {t} = useTranslation();
  if(isLoading){
    return <BranchTableSkeleton />
  }
  if(error){
    return <Error message={error.message} />
  }
  return (
    <Box m={4} bg={"gray.100"} borderRadius={20} w={'380px'}>
      <TableContainer borderRadius={20} maxHeight={'590px'} overflowY={'auto'} bgColor={colorMode === 'dark' ? MyDarkColor : 'white'}>
        <Table variant={"simple"} size={{lg:"lg" , base:"sm"}}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Icon as={AiOutlineEllipsis} pr={1} />
                {t("Name")}
              </Th>
              <Th>
                <Icon as={AiOutlineCode} pr={1} />
                {t("Code")}
              </Th>
              <Th>
                <Icon as={AiOutlinePhone} pr={1} />
                {t("Phone")}
              </Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((Br,index) => (
              <Tr
                key={Br.id}
                onClick={() => {setBranch(Br);}}
                bg={branch.name === Br.name ? "gray.500" : ""}
                _hover={{ bg: "gray.500" }}
              > 
                <Td>{index + 1}</Td>
                <Td>{Br.name}</Td>
                <Td>{Br.code}</Td>
                <Td>{Br.phone}</Td>
                
                <Td>
                  <Button mr={3} colorScheme={"blue"}
                   onClick={(e) => {
                    e.stopPropagation(); 
                    handleEditBranch(Br.id);
                    }}
                  >
                    {t("Edit")}
                  </Button>
                  {Br.id && <DeleteC ID={Br.id} target="branches"/>}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomModal buttonLabel={"Edit"} isOpen={isOpen} onClose={onClose}>
        <BranchForm isEdit={true} ID={BranchId} />
      </CustomModal>
    </Box>
  );
};
export default BranchTable;
