import { Select, Spinner } from "@chakra-ui/react"
import item from "../../entities/items"
import useGetAll from "../../hooks/useGetAll";
import { Error } from "../Error";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";


interface Props{
    selectItem : (selectedItem : number) => void;
    setSelectedQuantity : (SelectedQuantity : number) => void;
}

export const DonorItemsSelector = ({selectItem, setSelectedQuantity} : Props) => {
    const {data , isLoading , error , fetchNextPage , hasNextPage} = useGetAll<item>("items");
    const handleSelectItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        selectItem(Number(event.target.value));
        if (!data) return;
        const SelectedQuantity = data.pages.flatMap(page => page.data).find(item => item.id === Number(event.target.value))?.["quantity in the system"];
        if(SelectedQuantity)
        setSelectedQuantity(SelectedQuantity);
      };
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
    placeholder="select item"
    onChange={handleSelectItem}
    borderRadius={20}
    color="gray.400"
    >
        {data.pages.map((page , index) => (
            <React.Fragment key={index}>
                {page.data.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </React.Fragment>
        ))}
    </Select>
    </InfiniteScroll>
  )
}
