import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";
import Board from "./Board";
const ListBoards = styled.div`
  display: flex;
  width: 650px;
  justify-content: center;
  align-items: center;
`;
interface BoardsInterface {
  boardList: string[];
  toDos: any;
}
function Boards({ boardList, toDos }: BoardsInterface) {
  return (
    <Droppable droppableId="board" type="CARD" direction="horizontal">
      {(provided) => (
        <ListBoards ref={provided.innerRef} {...provided.droppableProps}>
          {boardList.map((boardId: string, index) => (
            <Draggable key={boardId} draggableId={boardId} index={index}>
              {(provided) => (
                <div
                  key={boardId}
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  <Board
                    boardList={boardList}
                    toDos={toDos[boardId]}
                    boardId={boardId}
                  ></Board>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ListBoards>
      )}
    </Droppable>
  );
}

export default Boards;
