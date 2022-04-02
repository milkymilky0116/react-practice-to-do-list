import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  faCancel,
  faPlusCircle,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import CustomForm from "./CustomForm";
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IBtnProps {
  color: string;
}
const Wrapper = styled.div`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 600px;
  flex-grow: 1;
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

const DropArea = styled.div<IAreaProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;
const DeleteArea = styled.div<IAreaProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  visibility: ${(props) =>
    props.isDraggingOver
      ? "visible"
      : props.isDraggingFromThis
      ? "visible"
      : "hidden"};
  transition: background-color 0.2s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const InsertBtn = styled.div<IBtnProps>`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  font-size: 15px;
  gap: 10px;
  align-items: center;
  color: ${(props) => props.color};
  border-radius: 5px;
  :hover {
    background-color: #878787;
    color: black;
  }
`;
const InsertMenu = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  align-items: center;
`;
const TrashCanWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 15px;
    height: 15px;
  }
  padding-bottom: 10px;
`;
function Board({ toDos, boardId }: IBoardProps) {
  const [visible, setVisible] = useState(false);
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setVisible(!visible);
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <DropArea
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </DropArea>
        )}
      </Droppable>

      <CustomForm
        boardId={boardId}
        isVisible={visible}
        toDo={"text"}
      ></CustomForm>
      <InsertMenu>
        <InsertBtn onClick={onClick} color={"#565656"}>
          {visible ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faPlusCircle} />
          )}
          <h1>Add a card</h1>
        </InsertBtn>
      </InsertMenu>
    </Wrapper>
  );
}

export default Board;
