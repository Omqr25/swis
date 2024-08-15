import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useCreateTransactionStore from "../../stores/createTransactionStroe";
import AddedItemsList from "./AddedItemsList";
import { DonorItemsSelector } from "./DonorItemsSelector";
import { KeeperItemsSelector } from "./KeeperItemsSelector";
import { WarehousesSelector } from "../WarehousesSelector";

interface Props {
  updateDisabled: (index: number, Disabled: boolean) => void;
  Disabled: boolean[];
  User: string;
}

export const TransactionItems = ({ updateDisabled, Disabled, User }: Props) => {
  const [selectedItem, selectItem] = useState<number>(0);

  const [itemErorr, setItemError] = useState(false);

  const [selectedWarehouse, selectWarehouse] = useState<number>(0);

  const [quantity, setQuantity] = useState<number>(0);

  const [quantityError, setQuantityError] = useState(false);

  const [SelectedQuantity, setSelectedQuantity] = useState<number>(1);

  const { t } = useTranslation();

  const { Items } = useCreateTransactionStore() || [];

  const setItems = useCreateTransactionStore((s) => s.setItems);

  const handleSubmit = () => {
    console.log("Submitted items:", selectedItem, selectedWarehouse, quantity);
    const exist = Items?.some(
      (existItem) => existItem.item_id === selectedItem
    );
    setItemError(exist);
    if (!quantityError && !exist) {
      const newItem = {
        item_id: selectedItem,
        quantity,
        warehouse_id: selectedWarehouse,
      };
      setItems([...Items, newItem]);
      if (Items.length === 0) setItems([...Items, newItem]);
      if (Disabled[2] === true) updateDisabled(2, false);
    }
  };

  return (
    <Box p={4}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {
          <Stack spacing={4} mb={4}>
            <FormControl id="item" isRequired>
              <FormLabel>{t("Item")}</FormLabel>
              {User === "Keeper" && (
                <KeeperItemsSelector
                  selectItem={selectItem}
                  setSelectedQuantity={setSelectedQuantity}
                />
              )}
              {User === "Donor" && (
                <DonorItemsSelector
                  selectItem={selectItem}
                  setSelectedQuantity={setSelectedQuantity}
                />
              )}
              {itemErorr && (
                <Text textColor={"red"}>THIS ITEM IS SELECTED</Text>
              )}
            </FormControl>
            <FormControl id="quantity" isRequired>
              <FormLabel>{t("Quantity")}</FormLabel>
              <Input
                type="number"
                borderRadius={20}
                name="quantity"
                placeholder="Enter quantity"
                onChange={(e) => {
                  e.stopPropagation();
                  setQuantity(Number(e.target.value));
                  if (
                    Number(e.target.value) <= 0 ||
                    Number(e.target.value) > SelectedQuantity
                  )
                    setQuantityError(true);
                  else setQuantityError(false);
                }}
              />
              {quantityError && (
                <Text textColor={"red"}>
                  THE QUANTITY SHOULD BE MORE THAN 0 and LESS THAN OR EQUAL TO{" "}
                  {SelectedQuantity}
                </Text>
              )}
            </FormControl>
            <FormControl id="warehouse" isRequired>
              <FormLabel>{t("Warehouse")}</FormLabel>
              <WarehousesSelector selectWarehouse={selectWarehouse} />
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              w={"50%"}
              alignSelf={"center"}
              marginTop={5}
              borderRadius={"20"}
            >
              {t("AddItem")}
            </Button>
            <Divider borderWidth={"4px"} borderColor={"black"} />
            <AddedItemsList
              updateDisabled={updateDisabled}
              Disabled={Disabled}
            />
          </Stack>
        }
      </form>
    </Box>
  );
};
