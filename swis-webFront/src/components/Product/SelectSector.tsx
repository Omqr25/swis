import { Select } from "@chakra-ui/react";
interface Props {
  selectSector: (sector: string) => void;
}
export const SelectSector = ({ selectSector }: Props) => {
  const handleSelectSector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectSector(event.target.value);
  };
  return (
    <Select
      placeholder="Select Sector"
      onChange={handleSelectSector}
      borderRadius={"20"}
      width={"full"}
      color="gray.400"
    >
      <option value={1}>Wash</option>
      <option value={2}>NFIs_Shelters</option>
      <option value={3}>COMPLETEDFood_Agriculture</option>
      <option value={4}>Health</option>
      <option value={5}>Nutrition</option>
      <option value={6}>Protection</option>
      <option value={7}>Education</option>
      <option value={8}>Livelihoods</option>
    </Select>
  );
};
