import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, IToDo, IToDoState, toDoState } from "./atoms";
import Board from "./Components/Board";
import Boards from "./Components/Boards";

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
  console.log(toDos);
  useEffect(() => {
    setBoardList(() => {
      const tempboardList = Object.keys(toDos);
      console.log(tempboardList);
      return tempboardList;
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
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards boardList={boardList} toDos={toDos} />
        </Wrapper>
      </DragDropContext>
    </div>
  );
}

export default App;
