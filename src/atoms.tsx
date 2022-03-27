import { atom } from "recoil";
export interface IToDo {
  text: string;
  category: "TO_DO" | "Doing" | "Done";
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
