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
import { fetchCreateTask } from 'api/tasksApi';
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
      .addCase(fetchgetAllBoards.fulfilled, (state, action) => {
        console.log(action.payload);
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
