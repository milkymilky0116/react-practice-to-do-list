import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TrashCanBox = styled.div`
  width: 300px;
  min-height: 50px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 8px;
  display: flex;
  padding: 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
  padding: 10px 10px;
`;
function TrashCan() {
  return (
    <Droppable droppableId="trashCan">
      {(provided) => (
        <TrashCanBox ref={provided.innerRef} {...provided.droppableProps}>
          <FontAwesomeIcon icon={faTrashCan} />
          {provided.placeholder}
        </TrashCanBox>
      )}
    </Droppable>
  );
}

export default TrashCan;
