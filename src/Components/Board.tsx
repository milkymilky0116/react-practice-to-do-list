import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { formState, IToDo, menuState, toDoState } from "../atoms";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuElement from "./Menu";
import TrashCan from "./TrashCan";
import TextForm from "./TitleForm";
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  width: 300px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 10px 10px;
  box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
`;

const TopMenu = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  width: 300px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
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
  box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
`;
const Form = styled.form`
  input {
    font-size: 15px;
    background-color: white;
    height: 30px;
    width: 280px;
    border-radius: 3px;
    text-align: center;
    box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
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
  isDragging?: boolean;
}
interface FormInterface {
  text: string;
}
function Board({ isDragging, toDos, boardId }: BoardInterface) {
  const setToDos = useSetRecoilState(toDoState);
  const setFormState = useSetRecoilState(formState);
  const { register, setValue, handleSubmit } = useForm<FormInterface>();
  const [isMenuAppear, setMenuState] = useRecoilState(menuState);
  const isFormAppear = useRecoilValue(formState);
  const onValid = ({ text }: FormInterface) => {
    const newToDo = {
      id: Date.now(),
      text,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("text", "");
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
        {isFormAppear.isAppear ? (
          <TextForm />
        ) : (
          <>
            <Title>{boardId}</Title>
            <Menu onClick={onClick}>
              <FontAwesomeIcon icon={faEllipsis} />
            </Menu>
          </>
        )}
      </TopMenu>
      {isMenuAppear.isAppear ? <MenuElement /> : null}
      <Droppable droppableId={boardId}>
        {(provided) => (
          <CardBoard ref={provided.innerRef} {...provided.droppableProps}>
            {toDos?.map((item, index) => (
              <Card
                boardId={boardId}
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
            {...register("text", { required: true })}
            type="text"
            placeholder={`Add task on ${boardId}`}
          />
        </Form>
      </Wrapper>
    </>
  );
}

export default React.memo(Board);
