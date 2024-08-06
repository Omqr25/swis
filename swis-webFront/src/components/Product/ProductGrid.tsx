import { SimpleGrid, Spinner } from "@chakra-ui/react";
import item from "../../entities/items";
import useGetAll from "../../hooks/useGetAll";
import { Error } from "../Error";
import { BoxSkeleton } from "../Skeleton/BoxSkeleton";
import React from "react";
import { ProductBox } from "./ProductBox";
import InfiniteScroll from "react-infinite-scroll-component";

export const ProductGrid = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetAll<item>("items");
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const fecthedGamesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <InfiniteScroll
      dataLength={fecthedGamesCount}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<Spinner></Spinner>}
    >
      <SimpleGrid
        spacing={6}
        columns={{ sm: 1, md: 2, lg: 3 }}
        padding={"10px"}
        maxHeight={"600px"}
        overflowY={"auto"}
      >
        {isLoading && skeleton.map((s) => <BoxSkeleton key={s}></BoxSkeleton>)}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((product) => (
              <ProductBox key={product.id} product={product}></ProductBox>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
