import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "Doing" && (
        <button name="Doing" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "Done" && (
        <button name="Done" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
