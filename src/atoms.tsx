import { atom, selector, useRecoilState } from "recoil";
export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
    Test: [],
  },
});

export const boardState = atom<string[]>({
  key: "board",
  default: [],
});
