import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const tempToDos = [...allBoards[source.droppableId]];
        const taskObj = tempToDos[source.index];
        tempToDos.splice(source.index, 1);
        tempToDos.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: tempToDos,
        };
      });
    } else {
      setToDos((allBoards) => {
        const currentBoard = [...allBoards[source.droppableId]];
        const taskObj = currentBoard[source.index];
        const targetBoard = [...allBoards[destination?.droppableId]];
        currentBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: currentBoard,
          [destination?.droppableId]: targetBoard,
        };
      });
    }
  };
  return (
    <Wrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </DragDropContext>
      </Boards>
    </Wrapper>
  );
}

export default App;
