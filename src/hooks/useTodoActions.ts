// useTodoActions.ts
import { setTitle, useAppDispatch } from "@/store/store"; // adjust the path as needed
import {
  setStatus,
  setPriority,
  setDeadline,
  setDescription,
  setContent,
} from "@/store/store"; // adjust the path as needed
import { CardType, ColumnType, PriorityType } from "@/types/types"; // adjust the path as needed

export const useTodoActions = () => {
  const dispatch = useAppDispatch();

  const handleAllTodoChanges = (data: CardType) => {
    dispatch(setTitle(data.title));
    dispatch(setStatus(data.status));
    dispatch(setPriority(data.priority));
    if (!data.deadline || !data.description) {
      console.log("No deadline, description data");
      return;
    }
    dispatch(setDeadline(data.deadline));
    dispatch(setDescription(data.description));
    if (!data.content) {
      console.log("No content data");
      return;
    }
    dispatch(setContent(data.content));
  };

  const handleTitleChange = (title: string) => {
    dispatch(setTitle(title));
  };

  const handleStatusChange = (status: ColumnType) => {
    dispatch(setStatus(status));
  };

  const handlePriorityChange = (priority: PriorityType | undefined) => {
    dispatch(setPriority(priority));
  };

  const handleDeadlineChange = (deadline: string) => {
    dispatch(setDeadline(deadline));
  };

  const handleDescriptionChange = (description: string) => {
    dispatch(setDescription(description));
  };

  const handleContentChange = (content: string) => {
    dispatch(setContent(content));
  };

  return {
    handleTitleChange,
    handleStatusChange,
    handlePriorityChange,
    handleDeadlineChange,
    handleDescriptionChange,
    handleContentChange,
    handleAllTodoChanges,
  };
};
