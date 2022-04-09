import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { boardState, toDoState } from "../atoms";
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
interface FormInterface {
  title: string;
}
function CreateBoard() {
  const { register, handleSubmit, setValue } = useForm<FormInterface>();
  const setToDos = useSetRecoilState(toDoState);
  const setBoardList = useSetRecoilState(boardState);
  const onValid = ({ title }: FormInterface) => {
    setToDos((oldBoards) => {
      return { ...oldBoards, [title]: [] };
    });
    setBoardList((boardList) => {
      return [...boardList, title];
    });
    setValue("title", "");
  };
  return (
    <CreateBtn>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Create a board"
        ></input>
      </Form>
    </CreateBtn>
  );
}

export default CreateBoard;
