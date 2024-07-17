import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
import DeleteC from "../Delete";
import { CiEdit } from "react-icons/ci";
import { BiCode } from "react-icons/bi";
import { IoLogoCapacitor } from "react-icons/io5";
import { FaCity, FaUser, FaWarehouse } from "react-icons/fa";
import Warehouse from "../../entities/warehouse";
import useWarehouse from "../../stores/warehouses";

interface Props {
  warehouse: Warehouse;
}
export const WarehouseBox = ({ warehouse }: Props) => {
  const setWarehouse = useWarehouse((s) => s.setWarehouse);

  return (
    <Box
      key={warehouse.id}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      m={2}
      transition={"transform 0.2s ease-in-out"}
      _hover={{
        bgColor: "gray.500",
        transform: "sclae(1.1)",
      }}
      position="relative"
      onClick={() => {
        setWarehouse(warehouse);
      }}
    >
      {warehouse.id && <DeleteC ID={warehouse.id} target="warehouses" />}

      <Text fontSize={22} fontWeight="bold">
        <IconButton
          aria-label="editing the warehouse"
          icon={<CiEdit />}
          size={"20px"}
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
    </Box>
  );
};
