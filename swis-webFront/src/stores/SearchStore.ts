import { create } from "zustand";

interface SearchStore{
    data : string;
    setData : (data : string) => void;
}


const useSearchStore = create<SearchStore>()((set) => ({
    data : "",
    setData: (data) => set(() => ({data : data}))
}));

export default useSearchStore;

