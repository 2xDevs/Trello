import { CardType, ColumnType, PriorityType } from "@/types/types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Define the initial state using the TodoState interface
interface TodoState {
  value: CardType;
}

const initialState: TodoState = {
  value: {
    title: "",
    status: "To do",
    priority: undefined,
    deadline: "",
    description: "",
    content: "",
  },
};

// Create a slice with actions
export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.value.title = action.payload;
    },
    setStatus: (state, action: PayloadAction<ColumnType>) => {
      state.value.status = action.payload;
    },
    setPriority: (state, action: PayloadAction<PriorityType | undefined>) => {
      state.value.priority = action.payload;
    },
    setDeadline: (state, action: PayloadAction<string>) => {
      state.value.deadline = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.value.description = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.value.content = action.payload;
    },
  },
});

// Export the actions
export const {
  setTitle,
  setStatus,
  setPriority,
  setDeadline,
  setDescription,
  setContent,
} = TodoSlice.actions;

// Configure the store
export const store = configureStore({
  reducer: {
    todo: TodoSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
