import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllBoards,
  fetchCreateBoard,
  fetchDeleteBoard,
  fetchGetBoardById,
  fetchUpdateBoard,
  IBoard,
} from 'api/boardsApi';
import { fetchCreateColumn, fetchGetAllColumns } from 'api/columnsApi';
import { IBoardDetailed } from 'api/contracts';
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
  reducers: {
    addDnd(state, action) {
      console.log(action);
      const { sInd, items } = action.payload;
      state.boards.columns[sInd].tasks = items;
    },
    addDnd2(state, action) {
      console.log(action);
      const { items, sInd, dInd } = action.payload;
      state.boards.columns[sInd].tasks = items[sInd];
      state.boards.columns[dInd].tasks = items[dInd];
    },
    addDndcolumn(state, action) {
      state.boards.columns = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.AllBoards = action.payload;
      })
      .addCase(fetchDeleteBoard.fulfilled, (state, { payload }) => {
        state.AllBoards = state.AllBoards.filter((board) => board._id !== payload);
      })
      .addCase(fetchCreateBoard.fulfilled, (state, action) => {
        state.AllBoards = [...state.AllBoards, action.payload];
      })
      .addCase(fetchUpdateBoard.fulfilled, (state, { payload }) => {
        state.AllBoards = state.AllBoards.map((board) =>
          board._id === payload._id ? payload : board
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
