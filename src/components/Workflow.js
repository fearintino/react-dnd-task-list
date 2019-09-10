// @flow
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import type { Workflow as WorkflowType } from '../modules/reducers/workflows';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  padding: 8px;
`;

type WorkflowComponentProps = { +workflow: WorkflowType };

const Workflow = ({ workflow: { id, title, taskIds } }: WorkflowComponentProps) => {
  const tasks = useSelector(state => taskIds.map(taskId => state.tasks[taskId]));

  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Workflow;
