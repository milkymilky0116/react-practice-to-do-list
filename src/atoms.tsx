import { atom, selector } from "recoil";

const localId = "toDO";
export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(localId);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(localId)
        : localStorage.setItem(localId, JSON.stringify(newValue));
    });
  };
export const trashbinState = atom<Boolean>({
  key: "trashBin",
  default: false,
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [localStorageEffect(localId)],
});
