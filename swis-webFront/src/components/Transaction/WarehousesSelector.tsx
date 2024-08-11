import { Select, Spinner } from "@chakra-ui/react"
import useGetAll from "../../hooks/useGetAll";
import Warehouse from "../../entities/warehouse";
import { Error } from "../Error";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";

interface Props{
    selectWarehouse : (selectedWarehouse : number) => void;
}

export const WarehousesSelector = ({selectWarehouse} : Props) => {
    const handleSelectWarehouse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectWarehouse(Number(event.target.value));
      };
      const {data , isLoading , error , fetchNextPage , hasNextPage} = useGetAll<Warehouse>("warehouses");
      const fecthedGamesCount =
      data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
  if(isLoading){
      return <Spinner />
  }      
  if(error){
      return <Error message={error.message}/>
  }
  return (
    <InfiniteScroll 
    dataLength={fecthedGamesCount}
    next={() => fetchNextPage()}
    hasMore={!!hasNextPage}
    loader={<Spinner></Spinner>}
    >
    <Select
    placeholder="select warehouse"
    onChange={handleSelectWarehouse}
    name="warehouse"
    borderRadius={20}
    width={"full"}
    color="gray.400"
    >
         {data.pages.map((page , index) => (
            <React.Fragment key={index}>
                {page.data.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                ))}
            </React.Fragment>
        ))}
    </Select>
    </InfiniteScroll>
  )
}
