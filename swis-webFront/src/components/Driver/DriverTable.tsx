import {
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
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { FaBuilding, FaCar, FaEdit, FaIdCard } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import Driver from "../../entities/Drivers";
import useGetAll from "../../hooks/useGetAll";
import DeleteC from "../Delete";
import { Error } from "../Error";
import { TableSkeleton } from "../Skeleton/TableSkeleton";
import CustomModal from "../Modal";
import { DriverForm } from "./DriverForm";

export const DriverTable = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetAll<Driver>("drivers");
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const fetchedBranchesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [DriverId , setDriverId] = useState<number>();
  const handleEdit = (ID? : number) => {
    if(onOpen){
        onOpen();
        setDriverId(ID);
    }
  }
  if (isLoading) return <TableSkeleton />;
  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <TableContainer
      maxHeight={"625px"}
      overflowY={"auto"}
      bgColor={colorMode === "dark" ? "gray.700" : "white"}
      w={'1330px'}
      p={2}
    >
      <InfiniteScroll
        dataLength={fetchedBranchesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Icon boxSize={"25px"} as={AiOutlineEllipsis} pr={1} pt={3} />
                {t("Name")}
              </Th>
              <Th>
                <Icon boxSize={"25px"} as={AiOutlinePhone} pr={1} pt={3} />
                {t("Phone")}
              </Th>
              <Th>
                <Icon boxSize={"25px"} as={FaCar} pr={1} pt={3} />
                {t("vehicle_number")}
              </Th>
              <Th>
                <Icon boxSize={"25px"} as={FaIdCard} pr={1} pt={3} />
                {t("national_id")}
              </Th>
              <Th>
                <Icon boxSize={"25px"} as={FaBuilding} pr={1} pt={3} />
                {t("transportation_company_name")}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((Driver) => (
                  <Tr borderBottom="2px solid gray" key={Driver.id} _hover={{ bg: "gray.500" }}>
                    <Td>{Driver.name}</Td>
                    <Td>{Driver.phone}</Td>
                    <Td>{Driver.vehicle_number}</Td>
                    <Td>{Driver.national_id}</Td>
                    <Td>{Driver.transportation_company_name}</Td>
                    <Td>
                      <Button
                        leftIcon={<FaEdit />}
                        mr={3}
                        colorScheme={"blue"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(Driver.id);
                        }}
                      >
                        {t("Edit")}
                      </Button>
                      {Driver.id && (
                        <DeleteC ID={Driver.id} target="donors" type="Button" />
                      )}
                    </Td>
                  </Tr>
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </InfiniteScroll>
      <CustomModal buttonLabel={"Edit"} isOpen={isOpen} onClose={onClose}>
        {DriverId && <DriverForm isEdit={true} ID={DriverId} />}
      </CustomModal>
    </TableContainer>
  );
};
