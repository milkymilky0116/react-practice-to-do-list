import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Element = styled.div<dragPropInterface>`
  margin-top: 10px;
  height: 30px;
  background-color: white;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-size: 12px;
  background-color: ${(props) =>
    props.isDragging ? "rgba(119, 119, 119, 0.4)" : "white"};
`;
interface CardInterface {
  toDoId: number;
  item: string;
  index: number;
}
interface dragPropInterface {
  isDragging: boolean;
}
function Card({ toDoId, item, index }: CardInterface) {
  return (
    <Draggable key={item} draggableId={toDoId + ""} index={index}>
      {(provided, info) => (
        <Element
          ref={provided.innerRef}
          isDragging={info.isDragging}
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
