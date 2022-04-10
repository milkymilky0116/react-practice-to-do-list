import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { boardState, toDoState } from "../atoms";
import TrashCan from "./TrashCan";
const Wrapper = styled.div`
  width: 300px;
  height: 500px;
`;
const Form = styled.form`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 8px;
  display: flex;
  padding: 10px 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
  input {
    font-size: 15px;
    background-color: white;
    height: 30px;
    width: 280px;
    border-radius: 3px;
    text-align: center;
    box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
  }
  margin-bottom: 10px;
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
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Create a board"
          ></input>
        </Form>
        <TrashCan />
      </Wrapper>
    </>
  );
}

export default CreateBoard;
