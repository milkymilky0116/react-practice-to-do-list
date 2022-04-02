import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import styled from "styled-components";
import React from "react";
interface ICardProps {
  isDragging: boolean;
}
const Card = styled.div<ICardProps>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  opacity: ${(props) => (props.isDragging ? 0.7 : 1)};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.4)" : "none"}; ;
`;
interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, info) => (
        <Card
          ref={magic.innerRef}
          isDragging={info.isDragging}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
