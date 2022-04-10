import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  boardId,
  boardState,
  IToDo,
  IToDoState,
  localId,
  toDoState,
} from "./atoms";
import Board from "./Components/Board";
import Boards from "./Components/Boards";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 0.4;
`;
const Wrapper = styled.div`
  display: flex;
  max-width: 1500vw;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boardList, setBoardList] = useRecoilState(boardState);
  useEffect(() => {
    setBoardList((oldBoard) => {
      if (!localStorage.getItem(boardId)) {
        const tempboardList = Object.keys(toDos);
        return tempboardList;
      }
      return oldBoard;
    });
    setToDos((oldToDos) => {
      return oldToDos;
    });
  }, []);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === "board") {
      setBoardList((oldBoardList) => {
        const tempList = [...oldBoardList];
        tempList.splice(source.index, 1);
        tempList.splice(destination.index, 0, draggableId);
        return tempList;
      });
    } else if (destination.droppableId === "trashCan") {
      setToDos((allBoards) => {
        const sourceBoards = [...allBoards[source.droppableId]];
        sourceBoards.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoards,
        };
      });
    } else {
      if (destination.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoards = [...allBoards[source.droppableId]];
          const destinationBoards = [...allBoards[destination.droppableId]];
          const newObj = sourceBoards[source.index];
          sourceBoards.splice(source.index, 1);
          destinationBoards.splice(destination.index, 0, newObj);
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
          const newObj = sourceBoards[source.index];
          sourceBoards.splice(source.index, 1);
          sourceBoards.splice(destination.index, 0, newObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoards,
          };
        });
      }
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards boardList={boardList} toDos={toDos} />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
