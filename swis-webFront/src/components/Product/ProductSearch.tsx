import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { itemSearch } from "../../entities/items";
import useSearch from "../../hooks/useSearch";
import useSearchStore from "../../stores/SearchStore";
import { Error } from "../Error";
import { BoxSkeleton } from "../Skeleton/BoxSkeleton";
import { ProductSearchBox } from "./ProductSearchBox";

export const ProductSearch = () => {
  const { data: SearchData } = useSearchStore();
  const { data, isLoading, error } = useSearch<itemSearch>(
    "search/searchitems",
    SearchData
  );
  if (isLoading) return <BoxSkeleton />;
  if (error) return <Error message={error.message} />;
  if(!data.data){
    return <Text fontSize={40} m={32} textAlign={'center'}>There is No Such Item</Text>
  }
  return (
    <SimpleGrid
      spacing={6}
      columns={{ md: 1, lg: 2, xl: 3 }}
      padding={"10px"}
      maxHeight={"600px"}
      overflowY={"auto"}
    >
      <Box>
      {data.data.map((product, index) => (
        <ProductSearchBox key={index} product={product.searchable}></ProductSearchBox>
      ))}
      </Box>
    </SimpleGrid>
  );
};
