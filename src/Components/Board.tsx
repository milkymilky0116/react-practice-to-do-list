import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
const CardBoard = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 400px;
  padding: 10px 10px;
  border-radius: 8px;
  width: 150px;
  margin-right: 10px;
`;
const Form = styled.form``;
interface BoardInterface {
  boardList: string[];
  toDos: IToDo[];
  boardId: string;
}
interface FormInterface {
  toDo: string;
}
function Board({ boardList, toDos, boardId }: BoardInterface) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<FormInterface>();
  const onValid = ({ toDo }: FormInterface) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <CardBoard ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((item, index) => (
              <Card
                key={index}
                toDoId={item.id}
                item={item.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </CardBoard>
        )}
      </Droppable>
    </div>
  );
}

export default React.memo(Board);
