import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { boardState, IToDo, toDoState } from "../atoms";
import Board from "./Board";

import { useSetRecoilState } from "recoil";
import CreateBoard from "./CreateBoard";
const ListBoards = styled.div`
  display: flex;
  width: 1500vw;
  justify-content: center;
  align-items: center;
`;
interface BoardsInterface {
  boardList: string[];
  toDos: any;
}

const Title = styled.h1`
  margin-left: 10px;
`;

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
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <CreateBoard />
        </ListBoards>
      )}
    </Droppable>
  );
}

export default Boards;
