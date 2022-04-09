import { atom, selector, useRecoilState } from "recoil";
let localId = "toDo";
let localList = JSON.parse(localStorage.getItem(localId) as any);
export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: localId,
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
