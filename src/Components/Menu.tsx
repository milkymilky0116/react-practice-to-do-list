import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardId, boardState, menuState, toDoState } from "../atoms";
interface MenuInterface {
  position: number[];
}
interface StyledBoxProps {
  topX: string;
  topY: string;
}
const BoxMenu = styled.div<StyledBoxProps>`
  width: 150px;
  height: 200px;
  background-color: white;
  position: absolute;
  left: ${(props) => props.topX};
  top: ${(props) => props.topY};
  border-radius: 5px;
  box-shadow: 5px 4px 8px 1px rgba(119, 119, 119, 0.1);
`;

const SubElement = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(119, 119, 119, 0.1);
  display: flex;
  align-items: center;
  color: rgba(119, 119, 119, 0.8);
  padding: 10px 10px;
  font-size: 12px;
  :hover {
    background-color: grey;
    span {
      color: black;
    }
  }
`;

function MenuElement() {
  const menuValue = useRecoilValue(menuState);
  const setToDoState = useSetRecoilState(toDoState);
  const setBoardState = useSetRecoilState(boardState);
  const setMenuState = useSetRecoilState(menuState);
  const onBoardDelete = () => {
    setToDoState((oldToDos) => {
      const tempToDos = { ...oldToDos };
      delete tempToDos[menuValue.boardId];
      return tempToDos;
    });
    setBoardState((oldBoard) => {
      const tempBoards = [...oldBoard];
      const index = tempBoards.indexOf(menuValue.boardId);
      tempBoards.splice(index, 1);
      return tempBoards;
    });
    setMenuState((prevState) => {
      return {
        ...prevState,
        isAppear: false,
      };
    });
  };

  const onToDoDelete = () => {
    setToDoState((oldToDos) => {
      let tempToDos = { ...oldToDos }[menuValue.boardId];
      tempToDos = [];
      return { ...oldToDos, [menuValue.boardId]: tempToDos };
    });
    setMenuState((prevState) => {
      return {
        ...prevState,
        isAppear: false,
      };
    });
  };
  return (
    <BoxMenu
      topX={menuValue.positionX - 130 + "px"}
      topY={menuValue.positionY + 18 + "px"}
    >
      <SubElement onClick={onBoardDelete}>
        <span>Delete Board</span>
      </SubElement>
      <SubElement onClick={onToDoDelete}>
        <span>Delete All To Dos</span>
      </SubElement>
    </BoxMenu>
  );
}
export default MenuElement;
