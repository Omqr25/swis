import { Button, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorMode, useDisclosure } from "@chakra-ui/react";
import { DriverRequest } from "../../entities/Drivers";
import useSearch from "../../hooks/useSearch";
import useSearchStore from "../../stores/SearchStore";
import { Error } from "../Error";
import { TableSkeleton } from "../Skeleton/TableSkeleton";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { FaBuilding, FaCar, FaEdit, FaIdCard } from "react-icons/fa";
import DeleteC from "../Delete";
import CustomModal from "../Modal";
import { DriverForm } from "./DriverForm";

const DriverSearchTable = () => {
    const { data: SearchData } = useSearchStore();
    const { data, isLoading, error } = useSearch<DriverRequest>(
      "search/searchdrivers",
      SearchData
    );
    const { colorMode } = useColorMode();
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [DriverId , setDriverId] = useState<number>();
    const handleEdit = (ID? : number) => {
      if(onOpen){
          onOpen();
          setDriverId(ID);
      }
    }
    if(isLoading){
        return  <TableSkeleton></TableSkeleton>;
    }
    if (error) return <Error message={error.message} />;
    if(!data.data){
      return <Text fontSize={40} m={32} textAlign={'center'}>There is No Such Item</Text>
    }
  return (
    <TableContainer
    maxHeight={"625px"}
    overflowY={"auto"}
    bgColor={colorMode === "dark" ? "gray.700" : "white"}
    p={2}
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
              {data.data.map((Driver) => (
                <Tr borderBottom="2px solid gray" key={Driver.searchable.id} _hover={{ bg: "gray.500" }}>
                  <Td>{Driver.searchable.name?.en}</Td>
                  <Td>{Driver.searchable.phone}</Td>
                  <Td>{Driver.searchable.vehicle_number}</Td>
                  <Td>{Driver.searchable.national_id}</Td>
                  <Td>{Driver.searchable.transportation_company_name?.en}</Td>
                  <Td>
                    <Button
                      leftIcon={<FaEdit />}
                      mr={3}
                      colorScheme={"blue"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(Driver.searchable.id);
                      }}
                    >
                      {t("Edit")}
                    </Button>
                    {Driver.searchable.id && (
                      <DeleteC ID={Driver.searchable.id} target="donors" type="Button" />
                    )}
                  </Td>
                </Tr>
              ))}
            
        </Tbody>
      </Table>
    <CustomModal buttonLabel={"Edit"} isOpen={isOpen} onClose={onClose}>
      {DriverId && <DriverForm isEdit={true} ID={DriverId} />}
    </CustomModal>
  </TableContainer>
  )
}

export default DriverSearchTable