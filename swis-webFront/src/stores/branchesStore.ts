import { create } from "zustand";
import Branches, { Main_Branch } from "../entities/Branches";

interface branchesStore {
  branch: Branches;
  setId: (id: number) => void;
  setName: (name: string) => void;
  setCode: (code: string) => void;
  setParent_id: (main_branch: Main_Branch) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setBranch: (branch: Branches) => void;
}

const useBranchStore = create<branchesStore>((set) => ({
  branch: {},
  setId: (id) => set((store) => ({ branch: { ...store.branch, id } })),
  setName: (name) => set((store) => ({ branch: { ...store.branch, name } })),
  setCode: (code) => set((store) => ({ branch: { ...store.branch, code } })),
  setParent_id: (main_branch) =>
    set((store) => ({ branch: { ...store.branch, main_branch: main_branch } })),
  setPhone: (phone) => set((store) => ({ branch: { ...store.branch, phone } })),
  setAddress: (address) =>
    set((store) => ({ branch: { ...store.branch, address } })),
  setBranch: (branch) => set(() => ({ branch: branch })),
}));
export default useBranchStore;
