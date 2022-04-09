import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { boardState, IToDo, toDoState } from "../atoms";
import Board from "./Board";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
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
const CreateBtn = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 8px;
  bottom: 170px;
  display: flex;
  padding: 10px 10px;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  input {
    font-size: 15px;
    background-color: white;
    height: 30px;
    width: 280px;
    border-radius: 3px;
    text-align: center;
    box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.42);
  }
`;
const Title = styled.h1`
  margin-left: 10px;
`;
interface FormInterface {
  title: string;
}
function Boards({ boardList, toDos }: BoardsInterface) {
  const { register, handleSubmit, setValue } = useForm<FormInterface>();
  const setToDos = useSetRecoilState(toDoState);
  const setBoardList = useSetRecoilState(boardState);
  const onValid = ({ title }: FormInterface) => {
    const newBoard = {
      title,
    };
    setToDos((oldBoards) => {
      return { ...oldBoards, [title]: [] };
    });
    setBoardList((boardList) => {
      return [...boardList, title];
    });
    setValue("title", "");
  };
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
          <CreateBtn>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Create a board"
              ></input>
            </Form>
          </CreateBtn>
        </ListBoards>
      )}
    </Droppable>
  );
}

export default Boards;
