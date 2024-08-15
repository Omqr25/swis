import {
  Box,
  Checkbox,
  HStack,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import User from "../../entities/User";
import useGetAll from "../../hooks/useGetAll";
import useCreateTransactionStore from "../../stores/createTransactionStroe";

interface Props {
  updateDisabled: (index: number, Disabled: boolean) => void;
  setUser: (user: string) => void;
}

export const TransactionUserInformation = ({
  updateDisabled,
  setUser,
}: Props) => {
  const [checkedItems, setCheckedItems] = useState([true, false]);
  const endPoint = checkedItems[0] ? "users/indexKeeper" : "users/indexDonor";
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetAll<User>(endPoint);
  const [value, setValue] = useState("0");
  
  const setUserId = useCreateTransactionStore((s) => s.setUserId);
  
  const fecthedGamesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
  if (value != "0") {
    if(checkedItems[0]){
      setUser("Keeper");
      
    }else{
      setUser("Donor");
     
    } 
    setUserId(Number(value)); 
  }
  useEffect(() => {
    if (value != "0") updateDisabled(1, false);
  }, [value]);
  return (
    <Box>
      <HStack spacing={8} justifyContent={"center"}>
        <Text>
          Keeper{" "}
          <Checkbox
            isChecked={checkedItems[0]}
            onChange={() => setCheckedItems([true, false])}
          />
        </Text>
        <Text>
          Donor{" "}
          <Checkbox
            isChecked={checkedItems[1]}
            onChange={() => setCheckedItems([false, true])}
          />
        </Text>
      </HStack>
      {error && <Text textColor={"red"}>{error.message}</Text>}
      <List>
        {isLoading && <Spinner />}
        <InfiniteScroll
          dataLength={fecthedGamesCount}
          next={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          loader={<Spinner></Spinner>}
        >
          <RadioGroup onChange={setValue} value={value}>
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((user) => (
                  <ListItem borderBottom={"2px"} p={2} key={user.id}>
                    <HStack justifyContent={"space-between"}>
                      <Text>{user.name}</Text>
                      <Radio size="lg" value={`${user.id}`}></Radio>
                    </HStack>
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </RadioGroup>
        </InfiniteScroll>
      </List>
    </Box>
  );
};
