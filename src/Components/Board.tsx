import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, menuState, toDoState } from "../atoms";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuElement from "./Menu";
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  width: 300px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 10px 10px;
`;

const TopMenu = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  width: 300px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 600;
`;
const CardBoard = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 400px;
  padding: 10px 10px;
  width: 300px;
  margin-right: 10px;
`;
const Form = styled.form`
  input {
    font-size: 15px;
    background-color: white;
    height: 30px;
    width: 280px;
    border-radius: 3px;
    text-align: center;
    box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.42);
  }
`;
const Menu = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  :hover {
    background-color: grey;
    svg {
      opacity: 1;
    }
  }
  svg {
    opacity: 0.4;
  }
`;
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
  const [isMenuAppear, setMenuState] = useRecoilState(menuState);
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
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { pageX, pageY } = event;
    setMenuState((MenuState) => {
      const { isAppear } = MenuState;
      return {
        isAppear: !isAppear,
        positionX: pageX,
        positionY: pageY,
        boardId,
      };
    });
  };
  return (
    <>
      <TopMenu>
        <Title>{boardId}</Title>
        <Menu onClick={onClick}>
          <FontAwesomeIcon icon={faEllipsis} />
        </Menu>
      </TopMenu>
      {isMenuAppear.isAppear ? <MenuElement /> : null}
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
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("toDo", { required: true })}
            type="text"
            placeholder={`Add task on ${boardId}`}
          />
        </Form>
      </Wrapper>
    </>
  );
}

export default React.memo(Board);
