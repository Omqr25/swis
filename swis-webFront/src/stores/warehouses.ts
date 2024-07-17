import { create } from "zustand";
import Warehouse, { City, Location } from "../entities/warehouse";

interface warehousesStore {
    warehouse: Warehouse;
    setId: (id: number) => void;
    setName: (name: string) => void;
    setCode: (code: string) => void;
    setlocation: (location: Location) => void;
    setbranch: (branch: City) => void;
    setFree_capacity: (Free_capacity: number) => void;
    setmain_Warehouse: (main_Warehouse: City) => void;
    setWarehouse: (warehouse : Warehouse) => void;
  }

  const useWarehouse = create<warehousesStore>((set) => ({
    warehouse : {},
    setId: (id) => set((store) => ({ warehouse: { ...store.warehouse, id } })),
    setName: (name)=> set((store)=> ({warehouse: {...store.warehouse, name}})),
    setCode: (code)=> set((store)=> ({warehouse: {...store.warehouse, code}})),
    setlocation: (location)=> set((store)=> ({warehouse: {...store.warehouse, location}})),
    setbranch: (branch) => set((store)=> ({warehouse: {...store.warehouse, branch}})),
    setFree_capacity: (Free_capacity) => set((store)=> ({warehouse: {...store.warehouse, Free_capacity}})),
    setmain_Warehouse: (main_Warehouse) => set((store)=> ({warehouse: {...store.warehouse, main_Warehouse}})),
    setWarehouse: (warehouse) => set(()=> ({warehouse: warehouse})),
  }));
  export default useWarehouse;
  