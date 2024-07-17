import { AddIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

interface Props{
    onOpen: () => void;
}

export const AddButton = ({onOpen} : Props) => {
    const handleSubmit = () => {
        if(onOpen){
          onOpen();
        }
      }
  return (
    <IconButton
        colorScheme="green"
        aria-label="Add Branch"
        icon={<AddIcon />}
        isRound
        position={"fixed"}
        bottom={4}
        left={{ base: 4, md: 8, lg: 204 }}
        onClick={() => handleSubmit()}
      />
  )
}
