import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, toDoState } from "./atoms";
import Board from "./Components/Board";
import Boards from "./Components/Boards";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000vw;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boardList, setBoardList] = useRecoilState(boardState);
  console.log(boardList);
  useEffect(() => {
    setBoardList(() => {
      const boardList = Object.keys(toDos);
      return boardList;
    });
  }, [toDos]);
  useEffect(() => {});

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === "board") {
      setBoardList((oldBoardList) => {
        const tempList = [...oldBoardList];
        tempList.splice(source.index, 1);
        tempList.splice(destination.index, 0, draggableId);
        return tempList;
      });
      console.log(toDos);
    } else {
      if (destination.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoards = [...allBoards[source.droppableId]];
          const destinationBoards = [...allBoards[destination.droppableId]];
          sourceBoards.splice(source.index, 1);
          destinationBoards.splice(destination.index, 0, draggableId);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoards,
            [destination.droppableId]: destinationBoards,
          };
        });
      }
      if (destination.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoards = [...allBoards[source.droppableId]];
          sourceBoards.splice(source.index, 1);
          sourceBoards.splice(destination.index, 0, draggableId);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoards,
          };
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards boardList={boardList} toDos={toDos} />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
