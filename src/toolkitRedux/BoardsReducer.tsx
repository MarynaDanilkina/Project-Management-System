import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateBoard,
  fetchDeleteBoard,
  fetchgetAllBoards,
  fetchGetBoardById,
  fetchUpdateBoard,
  IBoard,
} from 'api/boardsApi';
import { fetchCreateColumn, fetchGetAllColumns } from 'api/columnsApi';
import { IBoardDetailed, Task } from 'api/contracts';
import { act } from 'react-dom/test-utils';
export type IInitialStateBoards = {
  boards: IBoardDetailed;
  Allboards: IBoard[];
};
export const initialState: IInitialStateBoards = {
  boards: {} as IBoardDetailed,
  Allboards: [],
};

export const reduserSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAllBoards.fulfilled, (state, action) => {
        state.Allboards = action.payload;
      })
      .addCase(fetchDeleteBoard.fulfilled, (state, action) => {
        state.Allboards = state.Allboards.filter((boards) => boards.id !== action.payload);
      })
      .addCase(fetchCreateBoard.fulfilled, (state, action) => {
        state.Allboards = [...state.Allboards, action.payload];
      })
      .addCase(fetchUpdateBoard.fulfilled, (state, action) => {
        const { id, title, description } = action.payload;
        const newBoard = { id, title, description };
        state.Allboards = state.Allboards.map((boards) =>
          boards.id === action.payload.id ? newBoard : boards
        );
      })
      .addCase(fetchGetBoardById.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(fetchGetAllColumns.fulfilled, (state, action) => {
        console.log(action);
        console.log(state);
      })
      .addCase(fetchCreateColumn.fulfilled, (state, action) => {
        state.boards.columns = [...state.boards.columns, { ...action.payload, tasks: [] }];
      });
  },
});
export default reduserSlice.reducer;
