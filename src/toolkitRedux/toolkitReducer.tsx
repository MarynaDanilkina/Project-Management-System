import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateBoard,
  fetchDeleteBoard,
  fetchgetAllBoards,
  fetchUpdateBoard,
  IBoard,
} from 'api/boardsApi';
export type IInitialStateBoards = {
  boards: {
    id: string;
    title: string;
    order: number;
    tasks: {
      id: string;
      title: string;
      order: number;
      done: boolean;
      description: string;
      userId: string;
      files: {
        filename: string;
        fileSize: number;
      }[];
    }[];
  }[];
  Allboards: IBoard[];
};
export const initialState: IInitialStateBoards = {
  boards: [
    {
      id: '1',
      title: 'Доска1',
      order: 1,
      tasks: [
        {
          id: '11',
          title: 'Задача11',
          order: 1,
          done: false,
          description: 'Описание доски 1 задача 1',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '12',
          title: 'Задача12',
          order: 12,
          done: false,
          description: 'Описание доски 1 задача 2',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f822222',
          files: [
            {
              filename: 'foto2222.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Доска 2',
      order: 12,
      tasks: [
        {
          id: '21',
          title: 'Задача21',
          order: 1,
          done: false,
          description: 'Описание доски 2 задача 1',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f85555',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '22',
          title: 'Задача22',
          order: 12,
          done: false,
          description: 'Описание доски 2 задача 2',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f86666666',
          files: [
            {
              filename: 'foto2222.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    },
  ],
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
      });
  },
});
export default reduserSlice.reducer;
