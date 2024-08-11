import { Box, Spinner } from "@chakra-ui/react";
import useWarehouse from "../../stores/warehouses";
import useGetOne from "../../hooks/useGetOne";
import Warehouse from "../../entities/warehouse";
import { Error } from "../Error";

const WarehouseItemsTab = () => {
    const warehouse = useWarehouse((s) => s.warehouse);
    const data = useGetOne<Warehouse>(Number(warehouse.id) , "warehouses/showWarehouseWithItems");
    const  items = data.data?.data.items;
    if (!warehouse.id) return <></>;
    if(data.isLoading)return <Spinner />
    if(data.error)return <Error message={data.error.message} />
  return (
    <Box m={4}>
     {items?.map((item , index) => (
         <Box
         key={item.id}
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
       {index + 1}- {item.name}

       </Box>
     ))}
    </Box>
  )
}

export default WarehouseItemsTab