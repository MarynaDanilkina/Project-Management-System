import { IBoardDetailed } from 'api/contracts';
import { useAppSelector } from 'interface/interface';
import React from 'react';
import './Columns.sass';
import Colomn from '../colomn/colomn';
import { Draggable, DraggableProvidedDragHandleProps, Droppable } from 'react-beautiful-dnd';
export type IBoardProps = {
  board: IBoardDetailed;
};
const Columns = () => {
  const { boards } = useAppSelector((state) => state.boards);

  return (
    <>
      <Droppable droppableId="droppable" direction="horizontal" type="column">
        {(provided) => (
          <div className="Boards__container" {...provided.droppableProps} ref={provided.innerRef}>
            {boards.columns.map((board, index) => (
              <Draggable key={board.id} draggableId={board.id} index={index}>
                {(provColumn, snapColumn) => (
                  <Colomn
                    board={board}
                    key={board.id}
                    index={index}
                    ColomnRef={provColumn.innerRef}
                    draggableProps={{ ...provColumn.draggableProps }}
                    dragHandleProps={{ ...provColumn.dragHandleProps! }}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Columns;
