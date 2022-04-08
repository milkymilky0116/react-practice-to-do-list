import { atom, selector, useRecoilState } from "recoil";
export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "c"],
    Doing: ["d", "e"],
    Done: ["f", "g"],
    Test: ["h", "i"],
  },
});

export const boardState = atom<string[]>({
  key: "board",
  default: [],
});
