import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

interface IForm {
  isVisible: boolean;
  toDo: string;
  boardId: string;
}
const ToDoForm = styled.form<IForm>`
  height: 50px;
  padding: 10px 0px;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #b2bec3;
  border-radius: 5px;
  background-color: white;
`;
function CustomForm({ isVisible, toDo, boardId }: IForm) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <ToDoForm
      onSubmit={handleSubmit(onValid)}
      toDo={toDo}
      isVisible={isVisible}
      boardId={boardId}
    >
      <Input
        {...register("toDo", { required: true })}
        placeholder="Enter a to do for this card"
      />
    </ToDoForm>
  );
}

export default CustomForm;
