// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import type { Task as TaskType } from '../modules/reducers/tasks';

const Container = styled.div`
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

type TaskProps = { +task: TaskType, +index: number };

const Task = ({ task, index }: TaskProps) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.content}
      </Container>
    )}
  </Draggable>
);

export default Task;
