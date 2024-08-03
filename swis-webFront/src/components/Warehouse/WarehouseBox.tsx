import { Box, Icon, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { BiCode } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FaCity, FaUser, FaWarehouse } from "react-icons/fa";
import { IoLogoCapacitor } from "react-icons/io5";
import Warehouse from "../../entities/warehouse";
import useWarehouse from "../../stores/warehouses";
import DeleteC from "../Delete";
import { useState } from "react";
import CustomModal from "../Modal";
import { WarehouseForm } from "./WarehouseForm";

interface Props {
  warehouse: Warehouse;
}
export const WarehouseBox = ({ warehouse }: Props) => {
  const setWarehouse = useWarehouse((s) => s.setWarehouse);

  const [warehouse_id , setWarehouse_Id] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const handleEditWarehouse = (id : number | undefined) => {
    
    if(onOpen && id){
      setWarehouse_Id(id);
      onOpen();
    }
  }
  return (
    <Box
      key={warehouse.id}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      m={2}
      _hover={{
        bgColor: "gray.500",
      }}
      position="relative"
      onClick={() => {
        setWarehouse(warehouse);
      }}
    >
      {warehouse.id && (
        <DeleteC ID={warehouse.id} target="warehouses" type="ذ" />
      )}

      <Text fontSize={22} fontWeight="bold">
        <IconButton
          aria-label="editing the warehouse"
          icon={<CiEdit />}
          size={"20px"}
          onClick={(e) => {
            e.stopPropagation();
            handleEditWarehouse(warehouse.id);
          }}
        />{" "}
        {warehouse.name}
      </Text>
      <Text mt={2}>
        <Icon as={BiCode} mr={1} />
        <b>Code:</b> {warehouse.code}
      </Text>
      <Text mt={2}>
        <Icon as={IoLogoCapacitor} mr={1} />
        <b>Capacity:</b> {warehouse.Free_capacity}
      </Text>
      <Text mt={2}>
        <Icon as={FaUser} mr={1} /> <b>Keeper:</b> {warehouse.keeper}
      </Text>
      <Text mt={2}>
        <Icon as={FaWarehouse} mr={1} /> <b>main_warehouse:</b>{" "}
        {warehouse.main_Warehouse?.name}
      </Text>
      <Text mt={2}>
        <Icon as={FaCity} mr={1} /> <b>Branch:</b> {warehouse.branch?.name}
      </Text>
      <CustomModal buttonLabel={"Edit"} isOpen={isOpen} onClose={onClose}>
        <WarehouseForm isEdit={true} ID={warehouse_id} />
      </CustomModal>
    </Box>
  );
};
