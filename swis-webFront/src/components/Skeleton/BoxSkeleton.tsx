import { Box, SkeletonText } from "@chakra-ui/react";

export const BoxSkeleton = () => {
  return (
    <>
      <Box
        width={"400px"}
        overflow={"hidden"}
        borderWidth="1px"
        borderRadius="lg"
        height="250px"
        p={4}
        m={2}
      >
        <SkeletonText />
      </Box>
    </>
  );
};
