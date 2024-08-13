import {
  Box,
  Button,
  Icon,
  Show,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MyDarkColor } from "../../constants";
import { BranchSearch } from "../../entities/Branches";
import useSearch from "../../hooks/useSearch";
import resizeWindow from "../../resizeWindow";
import useBranchStore from "../../stores/branchesStore";
import useSearchStore from "../../stores/SearchStore";
import DeleteC from "../Delete";
import { Error } from "../Error";
import CustomModal from "../Modal";
import { TableSkeleton } from "../Skeleton/TableSkeleton";
import { BranchForm } from "./BranchForm";
  
    const BranchSearchTable = () => {
    const { data: SearchData } = useSearchStore();
    const { data, isLoading, error } = useSearch<BranchSearch>(
      "search/searchbranches",
      SearchData
    );
    const setBranch = useBranchStore((s) => s.setBranch);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const branch = useBranchStore((s) => s.branch);
    const [BranchId, setBranchId] = useState(0);
  
  
    const handleEditBranch = (id: number | undefined) => {
      if (onOpen && id) {
        setBranchId(id);
        onOpen();
      }
    };
    const { colorMode } = useColorMode();
    const { t } = useTranslation();
  
    const { width } = resizeWindow();
    
  
    if (isLoading) return <TableSkeleton />;
    if (error) return <Error message={error.message} />;
    if (!data.data) {
      return (
        <Text fontSize={40} m={32} textAlign={"center"}>
          There is No Such Item
        </Text>
      );
    }
    return (
      <Box
        m={4}
        bg={"gray.100"}
        borderRadius={20}
        w={{ base: "380px", lg: (width * 1.8) / 3 }}
      >
        <TableContainer
          borderRadius={20}
          maxHeight={"600px"}
          overflowY={"auto"}
          bgColor={colorMode === "dark" ? MyDarkColor : "white"}
          w={"100%"}
        >
  
            <Table variant={"simple"} size={{ lg: "lg", base: "sm" }} w={"100%"}>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>
                    <Icon as={AiOutlineEllipsis} pr={1} />
                    {t("Name")}
                  </Th>
                  <Show above="lg">
                    <Th>
                      <Icon as={AiOutlinePhone} pr={1} />
                      {t("Phone")}
                    </Th>
                  </Show>
                </Tr>
              </Thead>
              <Tbody>
               
                    {data?.data.map((Br, index) => (
                      <Tr
                        key={index}
                        onClick={() => {
                          setBranch({
                            id : Br.searchable.id,
                            code : Br.searchable.code , 
                            main_branch : Br.searchable.main_branch 
                            , name: Br.searchable.name?.en ,
                            phone : Br.searchable.phone,
                            address : Br.searchable.address?.en
                          });
                        }}
                        bg={branch.name === Br.searchable.name?.en ? "gray.500" : ""}
                        _hover={{ bg: "gray.500" }}
                      >
                        <Td>{index + 1}</Td>
                        <Td>{Br.searchable.name?.en}</Td>
                        <Show above="lg">
                          <Td>{Br.searchable.phone}</Td>
                        </Show>
                        <Td>
                          <Button
                            leftIcon={<FaEdit />}
                            mr={3}
                            colorScheme={"blue"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditBranch(Br.searchable.id);
                            }}
                          >
                            {t("Edit")}
                          </Button>
                          {Br.searchable.id && (
                            <DeleteC ID={Br.searchable.id} target="branches" type="Button" />
                          )}
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
  export default BranchSearchTable;