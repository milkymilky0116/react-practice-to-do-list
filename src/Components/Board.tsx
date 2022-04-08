import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";

const CardBoard = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 400px;
  padding: 10px 10px;
  gap: 10px;
  border-radius: 8px;
  width: 150px;
  margin-right: 10px;
`;

interface BoardInterface {
  toDos: string[];
  boardId: string;
}
function Board({ toDos, boardId }: BoardInterface) {
  return (
    <div>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <CardBoard ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
            {provided.placeholder}
          </CardBoard>
        )}
      </Droppable>
    </div>
  );
}

export default React.memo(Board);
