import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import { BoxSkeleton } from "../Skeleton/BoxSkeleton"
import useSearchStore from "../../stores/SearchStore";
import useSearch from "../../hooks/useSearch";
import { WarehouseSearch } from "../../entities/warehouse";
import { Error } from "../Error";
import { motion } from "framer-motion";
import { WarehouseSearchBox } from "./WarehouseSearchBox";

const WarehouseSearchGrid = () => {
    const { data: SearchData } = useSearchStore();
    const { data, isLoading, error } = useSearch<WarehouseSearch>(
      "search/searchwarehouses",
      SearchData
    );
    const skeleton = [1, 2, 3, 4];
    if(isLoading){
        return <>
        {skeleton.map((s) => <BoxSkeleton key={s}></BoxSkeleton>)}
        </>
    }
    if (error) return <Error message={error.message} />;
    if(!data.data){
      return <Text fontSize={40} m={32} textAlign={'center'}>There is No Such Item</Text>
    }
  return (
    <Box>
        <SimpleGrid
          m={1}
          columns={{ lg: 2, base: 1 }}
          spacing={4}
          overflowY={"auto"}
          maxHeight={"88vh"}
        >
              {data.data.map((warehouse) => (
                <motion.div key={warehouse.searchable.id} whileHover={{ scale: 1.1 }}>
                  <WarehouseSearchBox warehouse={warehouse.searchable} />
                </motion.div>
              ))}
        </SimpleGrid>
    </Box>
  )
}

export default WarehouseSearchGrid