import { HStack, IconButton, List, ListItem, Text } from "@chakra-ui/react";
import useCreateTransactionStore from "../../stores/createTransactionStroe";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  updateDisabled: (index: number, Disabled: boolean) => void;
  Disabled: boolean[];
}

const AddedItemsList = ({ updateDisabled, Disabled }: Props) => {
  const { Items } = useCreateTransactionStore() || [];
  const setItems = useCreateTransactionStore((s) => s.setItems);
  const handleClick = (id: number) => {
    const updatedItems = Items.filter((item) => item.item_id !== id);
    setItems(updatedItems);
    if (updatedItems.length === 0 && Disabled[2] === false)
      updateDisabled(2, true);
  };

  return (
    <List m={2}>
      <HStack borderBottom={"2px"} justifyContent={"space-between"} p={2}>
        <Text>Item Id</Text>
        <Text>Quantity</Text>
        <Text>Warehouse Id</Text>
        <Text></Text>
      </HStack>
      {Items.map((item) => (
        <ListItem borderBottom={"1px"} key={item.item_id} p={2}>
          <HStack justifyContent={"space-between"}>
            <Text>{item.item_id}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.warehouse_id}</Text>
            <IconButton
              aria-label="Delete Item"
              icon={<DeleteIcon />}
              onClick={() => {
                if (item.item_id) handleClick(item.item_id);
              }}
            ></IconButton>
          </HStack>
        </ListItem>
      ))}
      <Text textAlign={"center"}>No More Items..</Text>
    </List>
  );
};

export default AddedItemsList;
