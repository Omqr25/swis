import { Box, Heading, IconButton, Spinner, useDisclosure } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import Warehouse from "../../entities/warehouse";
import useSub from "../../hooks/useSub";
import useWarehouse from "../../stores/warehouses";
import { Error } from "../Error";
import CustomModal from "../Modal";
import { WarehouseForm } from "./WarehouseForm";
import { useState } from "react";

const SubWarehouse = () => {
  const warehouse = useWarehouse((s) => s.warehouse);

  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const [warehouse_id , setWarehouse_Id] = useState(0);

  const handleEditWarehouse = (id : number | undefined) => {
    if(onOpen && id){
      setWarehouse_Id(id);
      onOpen();
    }
  }

  const { data, error, isLoading } = useSub<Warehouse>(
    warehouse.id,
    "warehouses/indexSubWarehouse"
  );
  if (!warehouse.id) return <></>;
  if (error) return <Error message={error.message} />;
  if (isLoading) return <Spinner />;
  return (
    <Box m={4}>
      <Heading p={2} textAlign={'center'} fontSize={30}>{warehouse.name}</Heading>
      {data?.data.map((w,index) => (
      <Box
      key={w.id}
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
      >
       <IconButton
          aria-label="editing the warehouse"
          icon={<CiEdit />}
          onClick={(e) => {
            e.stopPropagation();
            handleEditWarehouse(warehouse.id);
          }}
          size={"20px"}
        />{" "} {index + 1}-{" "}{w.name}
      </Box>
      ))}
       <CustomModal buttonLabel={"Edit"} isOpen={isOpen} onClose={onClose}>
        <WarehouseForm isEdit={true} ID={warehouse_id} />
      </CustomModal>
    </Box>
  );
};

export default SubWarehouse;
