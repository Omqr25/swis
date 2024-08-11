import { Checkbox, HStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import User from "../../entities/User";
import useGetAll from "../../hooks/useGetAll";
import useCreateTransactionStore from "../../stores/createTransactionStroe";

interface Props {
  updateDisabled: (index: number, Disabled: boolean) => void;
  Disabled: boolean[];
}

export const TransactionDrivers = ({ updateDisabled, Disabled }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetAll<User>("drivers");
  const fecthedGamesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
    const {Drivers} = useCreateTransactionStore();
  const setDrivers = useCreateTransactionStore((s) => s.setDrivers);

  if (isLoading) return <Spinner></Spinner>;
  return (
    <InfiniteScroll
      dataLength={fecthedGamesCount}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<Spinner></Spinner>}
    >
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((driver) => (
            <HStack key={driver.id} p={2} justifyContent={"space-between"}>
              <Text>{driver.name}</Text>
              <Checkbox
                value={driver.id}
                onChange={(e) => {
                  if (e.target.checked && Drivers) {
                    setDrivers([...Drivers, { driver_id: driver.id }]);
                    if (Disabled[3] === true) updateDisabled(3, false); 
                  } else if (e.target.checked) {
                    setDrivers([{ driver_id: driver.id }]);
                    if (Disabled[3] === true) updateDisabled(3, false);
                  } else {
                    const updatedDrivers = Drivers?.filter(
                      (driverr) => driverr.driver_id != driver.id
                    );
                    if (updatedDrivers) setDrivers(updatedDrivers);
                    if (updatedDrivers?.length === 0 && Disabled[3] === false)
                      updateDisabled(3, true);
                  }
                  console.log(Drivers);
                }}
              ></Checkbox>
            </HStack>
          ))}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};
