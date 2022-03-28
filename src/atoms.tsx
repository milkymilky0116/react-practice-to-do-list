import { useEffect } from "react";
import { atom, selector } from "recoil";

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

let localId = "toDo";
let localList = JSON.parse(localStorage.getItem(localId) as any);
export const toDoState = atom<IToDo[]>({
  key: localId,
  default: localList,
  effects: [
    ({ onSet }) => {
      onSet(() => {
        useEffect(() => {
          localStorage.setItem(localId, JSON.parse());
        });
        localStorage.setItem(localId, localList);
      });
    },
  ],
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
