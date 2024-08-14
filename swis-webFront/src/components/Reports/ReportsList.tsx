import { Box, Button, HStack, List, ListItem, Text } from "@chakra-ui/react";
import useReports from "../../hooks/useReports"
import { Error } from "../Error";
import StackSkeleton from "../Skeleton/StackSkeleton";
import useDownLoad from "../../hooks/useDownload";

const ReportsList = () => {
 const {data , isLoading , error} = useReports();
 const DownLoad = useDownLoad();
 if(isLoading){
    return <StackSkeleton />
 }
 if(error){
    return <Error message={error.message} />
 }
  return (
    <List m={10}>
        {data.map((file , index) => (
            <Box p={2} m={2} h={'60px'} key={index} borderRadius={20}  borderWidth="1px">
            <ListItem >
                <HStack justifyContent={'space-between'} >
                <Text>{file.name}</Text>
                <Button colorScheme="gray" onClick={() => {
                    DownLoad.mutate({url : file.path})}}>Download</Button>
                </HStack>
            </ListItem>
            </Box>
        ))}
    </List>
  )
}

export default ReportsList