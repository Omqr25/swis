import { SimpleGrid, Spinner } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAll from "../../hooks/useGetAll";
import User from "../../entities/User";
import { Error } from "../Error";
import { UserCardSkeleton } from "./UserCardSkeleton";
import { UserCard } from "./UserCard";

interface Props {
  target: string;
}

export const UserGrid = ({ target }: Props) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetAll<User>(target);
  if (error) return <Error message={error.message} />;
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const fecthedGamesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
  return (
    <InfiniteScroll
      dataLength={fecthedGamesCount} 
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<Spinner></Spinner>}
    >
      <SimpleGrid
        spacing={6}
        columns={{ sm: 2, md: 3, lg: 4 }}
        padding={"10px"}
        maxHeight={"600px"}
        overflowY={"auto"}
      >
        {isLoading &&
          skeleton.map((s) => <UserCardSkeleton key={s}></UserCardSkeleton>)}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((user) => (
              <UserCard type={target === "users/indexDonor" ? "3" : "2"} key={user.id} user={user}></UserCard>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
