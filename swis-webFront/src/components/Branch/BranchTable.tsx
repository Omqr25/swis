import {
  Box,
  Button,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCode,
  AiOutlineEllipsis,
  AiOutlinePhone,
} from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { MyDarkColor } from "../../constants";
import Branches from "../../entities/Branches";
import useGetAll from "../../hooks/useGetAll";
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
  const [BranchId, setBranchId] = useState(0);
  
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetAll<Branches>("branches");

  const handleEditBranch = (id: number | undefined) => {
    if (onOpen && id) {
      setBranchId(id);
      onOpen();
    }
  };
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const fetchedBranchesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  if (isLoading) {
    return <BranchTableSkeleton />;
  }
  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <Box
      m={4}
      bg={"gray.100"}
      borderRadius={20}
      w={{ base: "380px", lg: "948px" }}
    >
      <InfiniteScroll
        dataLength={fetchedBranchesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <TableContainer
          borderRadius={20}
          maxHeight={"590px"}
          overflowY={"auto"}
          bgColor={colorMode === "dark" ? MyDarkColor : "white"}
        >
          <Table variant={"simple"} size={{ lg: "lg", base: "sm" }}>
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
              {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.data.map((Br, index) => (
                    <Tr
                      key={Br.id}
                      onClick={() => {
                        setBranch(Br);
                      }}
                      bg={branch.name === Br.name ? "gray.500" : ""}
                      _hover={{ bg: "gray.500" }}
                    >
                      <Td>{index + 1}</Td>
                      <Td>{Br.name}</Td>
                      <Td>{Br.code}</Td>
                      <Td>{Br.phone}</Td>

                      <Td>
                        <Button
                          mr={3}
                          colorScheme={"blue"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBranch(Br.id);
                          }}
                        >
                          {t("Edit")}
                        </Button>
                        {Br.id && <DeleteC ID={Br.id} target="branches" />}
                      </Td>
                    </Tr>
                  ))}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
      <CustomModal buttonLabel={"Edit"} isOpen={isOpen} onClose={onClose}>
        <BranchForm isEdit={true} ID={BranchId} />
      </CustomModal>
    </Box>
  );
};
export default BranchTable;
