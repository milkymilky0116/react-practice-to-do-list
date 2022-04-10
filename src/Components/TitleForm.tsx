import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, formState, menuState, toDoState } from "../atoms";

const TitleForm = styled.form`
  input {
    font-size: 15px;
    background-color: white;
    height: 30px;
    width: 280px;
    border-radius: 3px;
    text-align: center;
    box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
  }
`;
interface FormInterface {
  text: string;
}
function TextForm() {
  const { register, setValue, handleSubmit } = useForm<FormInterface>();
  const setToDos = useSetRecoilState(toDoState);
  const setBoardState = useSetRecoilState(boardState);
  const setFormState = useSetRecoilState(formState);
  const [isMenuAppear, setMenuState] = useRecoilState(menuState);
  const onTitleValid = ({ text }: FormInterface) => {
    setBoardState((oldBoards) => {
      const targetIndex = oldBoards.indexOf(isMenuAppear.boardId);
      const tempArr = [...oldBoards];
      tempArr.splice(targetIndex, 1);
      tempArr.splice(targetIndex, 0, text);
      console.log(tempArr);
      return oldBoards;
    });

    setToDos((oldToDos) => {
      let tempAllBoards = { ...oldToDos };
      tempAllBoards = Object.keys(tempAllBoards).reduce(
        (a, key) => ({
          ...a,
          [key === isMenuAppear.boardId ? text : key]: tempAllBoards[key],
        }),
        {}
      );
      console.log(tempAllBoards);
      return { ...oldToDos };
    });

    setFormState((prevState) => {
      return {
        ...prevState,
        isAppear: false,
      };
    });
    setMenuState((prevState) => {
      return {
        ...prevState,
        isAppear: false,
      };
    });
    setValue("text", "");
  };
  return (
    <TitleForm onSubmit={handleSubmit(onTitleValid)}>
      <input
        {...register("text", { required: true })}
        type="text"
        placeholder="Please Write new Board Title"
      />
    </TitleForm>
  );
}

export default TextForm;
