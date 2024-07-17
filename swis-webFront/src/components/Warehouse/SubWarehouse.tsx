import { Box, Heading, IconButton, Spinner } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import Warehouse from "../../entities/warehouse";
import useSub from "../../hooks/useSub";
import useWarehouse from "../../stores/warehouses";
import { Error } from "../Error";

const SubWarehouse = () => {
  const warehouse = useWarehouse((s) => s.warehouse);
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
          size={"20px"}
        />{" "} {index + 1}-{" "}{w.name}
      </Box>
      ))}
    </Box>
  );
};

export default SubWarehouse;
