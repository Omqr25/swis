import {
  Box,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Warehouse from "../../entities/warehouse";
import useGetAll from "../../hooks/useGetAll";
import { Error } from "../Error";
import { WarehouseBox } from "./WarehouseBox";
import { WarehouseBoxSkeleton } from "./WarehouseBoxSkeleton";

export const WarehouseGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetAll<Warehouse>("warehouses");  
  

  const fetchedBranchesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
    const skeleton = [1, 2, 3, 4];
  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <Box>
      <InfiniteScroll
        dataLength={fetchedBranchesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <SimpleGrid
          m={1}
          columns={{lg:2 , base:1}}
          spacing={4}
          overflowY={"auto"}
          maxHeight={"88vh"}
        >
          {isLoading && skeleton.map((s) => <WarehouseBoxSkeleton key={s}></WarehouseBoxSkeleton>)}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((warehouse) => (
                <WarehouseBox key={warehouse.id} warehouse={warehouse} />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};
