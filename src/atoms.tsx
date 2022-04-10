import { atom, selector, useRecoilState } from "recoil";
export const localId = "toDo";
export const boardId = "board";
export interface IToDo {
  id: number;
  text: string;
}

export interface IForm {
  isAppear: boolean;
}
export interface IToDoState {
  [key: string]: IToDo[];
}
interface IMenuState {
  isAppear: boolean;
  positionX: number;
  positionY: number;
  boardId: string;
}

interface IFormAppearState {
  id: string;
  isAppear: boolean;
}
export const localStorageEffect =
  (id: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(id);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(id)
        : localStorage.setItem(id, JSON.stringify(newValue));
    });
  };

export const menuState = atom<IMenuState>({
  key: "menu",
  default: {
    isAppear: false,
    positionX: 0,
    positionY: 0,
    boardId: "",
  },
});
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

export const formState = atom<IFormAppearState>({
  key: "form",
  default: {
    id: "",
    isAppear: false,
  },
});
