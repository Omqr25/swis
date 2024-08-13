import { SimpleGrid, Text } from "@chakra-ui/react";
import useSearch from "../../hooks/useSearch";
import useSearchStore from "../../stores/SearchStore";
import { Error } from "../Error";
import { CardSkeleton } from "../Skeleton/CardSkeleton";
import { UserSearch } from "../../entities/User";
import { UserSearchCard } from "./UserSearchCard";

const UserSearchGrid = () => {
    const { data: SearchData } = useSearchStore();
    const { data, isLoading, error } = useSearch<UserSearch>(
      "search/searchusers",
      SearchData
    );
    const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
    if(isLoading){
        return <>
        {skeleton.map((s) => <CardSkeleton key={s}></CardSkeleton>)}
        </>
    }
    if (error) return <Error message={error.message} />;
    if(!data.data){
      return <Text fontSize={40} m={32} textAlign={'center'}>There is No Such Item</Text>
    }
  return (
    <SimpleGrid
    spacing={6}
    columns={{ sm: 2, md: 3, lg: 4 }}
    padding={"10px"}
    maxHeight={"600px"}
    overflowY={"auto"}
  >
        {data.data.map((user , index) => (
          <UserSearchCard
            type={user.searchable.type}
            key={index}
            user={user.searchable}
          ></UserSearchCard>
        ))}
       </SimpleGrid>
  )
}

export default UserSearchGrid