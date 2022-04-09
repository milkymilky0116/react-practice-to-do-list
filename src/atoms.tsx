import { atom, selector, useRecoilState } from "recoil";
const localId = "toDo";
export const boardId = "board";
export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}
export const localStorageEffect =
  (id: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(id);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      console.log(newValue);
      isReset
        ? localStorage.removeItem(id)
        : localStorage.setItem(id, JSON.stringify(newValue));
    });
  };
export const toDoState = atom<IToDoState>({
  key: localId,
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [localStorageEffect(localId)],
});

export const boardState = atom<string[]>({
  key: "board",
  default: [],
  effects: [localStorageEffect(boardId)],
});
