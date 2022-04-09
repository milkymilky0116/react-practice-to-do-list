import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Element = styled.div`
  margin-top: 10px;
  height: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
interface CardInterface {
  toDoId: number;
  item: string;
  index: number;
}
function Card({ toDoId, item, index }: CardInterface) {
  return (
    <Draggable key={item} draggableId={toDoId + ""} index={index}>
      {(provided) => (
        <Element
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item}
        </Element>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
