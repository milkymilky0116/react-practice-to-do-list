import { atom, selector } from "recoil";

let localId = "toDo";

export enum Categories {
  "TO_DO" = "TO_DO",
  "Doing" = "Doing",
  "Done" = "Done",
}
export interface IToDo {
  text: string;
  category: Categories;
  id: number;
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
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect(localId)],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
