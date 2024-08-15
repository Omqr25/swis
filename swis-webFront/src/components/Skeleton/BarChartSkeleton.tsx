import { Box, HStack, Skeleton } from "@chakra-ui/react"

const BarChartSkeleton = () => {
  return (
   
    <HStack>
    <Box 
    width={"400px"}
    overflow={"hidden"}
    borderWidth="1px"
    borderRadius="lg"
    height="600px"
    p={16}
    m={2}>
     <Skeleton h={"400px"} w={'50px'} p={2} m={2}/>
    </Box>
    <Box 
       width={"400px"}
       overflow={"hidden"}
       borderWidth="1px"
       borderRadius="lg"
       height="600px"
       p={16}
       m={2}
       >
       <Skeleton h={"300px"} w={'50px'} p={2} m={2}/>
       </Box>
        <Box 
        width={"400px"}
        overflow={"hidden"}
        borderWidth="1px"
        borderRadius="lg"
        height="600px"
        p={16}
        m={2}>
        <Skeleton h={"500px"} w={'50px'} p={2} m={2}/>
        </Box>
     </HStack>
    
  )
}

export default BarChartSkeleton;