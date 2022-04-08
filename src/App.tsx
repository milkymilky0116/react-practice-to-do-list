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

const Wrapper = styled.div`
  display: flex;
  max-width: 600vw;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  width: 650px;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boardList, setBoardList] = useRecoilState(boardState);
  useEffect(() => {
    setBoardList(() => {
      const boardList = Object.keys(toDos);
      return boardList;
    });
  }, [toDos]);
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
        <Droppable droppableId="board" type="CARD" direction="horizontal">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {boardList.map((boardId, index) => (
                <Draggable key={boardId} draggableId={boardId} index={index}>
                  {(provided) => (
                    <div
                      key={boardId}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <Board toDos={toDos[boardId]} boardId={boardId}></Board>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
