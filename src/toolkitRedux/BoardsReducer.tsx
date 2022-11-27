import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateBoard,
  fetchDeleteBoard,
  fetchAllBoards,
  fetchGetBoardById,
  fetchUpdateBoard,
  IBoard,
} from 'api/boardsApi';
import { fetchCreateColumn, fetchGetAllColumns } from 'api/columnsApi';
import { IBoardDetailed, Task } from 'api/contracts';
import { fetchCreateTask } from 'api/tasksApi';
export type IInitialStateBoards = {
  boards: IBoardDetailed;
  AllBoards: IBoard[];
};
export const initialState: IInitialStateBoards = {
  boards: {} as IBoardDetailed,
  AllBoards: [],
};

export const reduserSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.AllBoards = action.payload;
      })
      .addCase(fetchDeleteBoard.fulfilled, (state, action) => {
        state.AllBoards = state.AllBoards.filter((boards) => boards.id !== action.payload);
      })
      .addCase(fetchCreateBoard.fulfilled, (state, action) => {
        state.AllBoards = [...state.AllBoards, action.payload];
      })
      .addCase(fetchUpdateBoard.fulfilled, (state, action) => {
        const { id, title, description } = action.payload;
        const newBoard = { id, title, description };
        state.AllBoards = state.AllBoards.map((boards) =>
          boards.id === action.payload.id ? newBoard : boards
        );
      })
      .addCase(fetchGetBoardById.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(fetchGetAllColumns.fulfilled, (state, action) => {})
      .addCase(fetchCreateColumn.fulfilled, (state, action) => {
        state.boards.columns = [...state.boards.columns, { ...action.payload, tasks: [] }];
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        const index = state.boards.columns.findIndex((el) => el.id === action.payload.columnId);
        state.boards.columns[index].tasks = [
          ...state.boards.columns[index].tasks,
          { ...action.payload.task, files: [] },
        ];
      });
  },
});
export default reduserSlice.reducer;
