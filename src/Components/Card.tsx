import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
const Element = styled.div<dragPropInterface>`
  margin-top: 10px;
  height: 30px;
  background-color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  font-size: 12px;
  background-color: ${(props) =>
    props.isDragging ? "rgba(119, 119, 119, 0.4)" : "white"};
  svg {
    color: ${(props) => props.theme.bgColor};
    width: 12px;
    height: 12px;
  }
`;

const Text = styled.span``;
const Form = styled.form`
  width: 100%;
  input {
    font-size: 15px;
    background-color: white;
    height: 20px;
    width: 100%;
    border-radius: 3px;
    text-align: center;
    box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
  }
`;
interface CardInterface {
  boardId: string;
  toDoId: number;
  item: string;
  index: number;
}
interface dragPropInterface {
  isDragging: boolean;
}
interface EditToDoInterface {
  text: string;
}
function Card({ boardId, toDoId, item, index }: CardInterface) {
  const [isEditClicked, setEditClick] = useState(false);
  const { register, handleSubmit, setValue } = useForm<EditToDoInterface>();
  const setToDoState = useSetRecoilState(toDoState);
  const onClick = () => {
    setEditClick((prev) => !prev);
  };
  const onValid = ({ text }: EditToDoInterface) => {
    setToDoState((oldToDos) => {
      const tempToDos = [...oldToDos[boardId]];

      const id = tempToDos[index].id;
      tempToDos.splice(index, 1);
      tempToDos.splice(index, 0, { id, text });

      return { ...oldToDos, [boardId]: tempToDos };
    });
    setValue("text", "");
    setEditClick(false);
  };
  return (
    <Draggable key={item} draggableId={toDoId + ""} index={index}>
      {(provided, info) => (
        <Element
          ref={provided.innerRef}
          isDragging={info.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditClicked ? (
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("text", { required: true })}
                type="text"
                placeholder="Edit To Do"
              />
            </Form>
          ) : (
            <>
              <Text>{item}</Text>
              <FontAwesomeIcon onClick={onClick} icon={faPencil} />
            </>
          )}
        </Element>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
