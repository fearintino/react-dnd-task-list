// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import type { Workflow as WorkflowType } from '../modules/reducers/workflows';
import dictionary from '../dictionary';

const Container = styled.div`
  padding: 15px;
  margin: 20px;
  border-radius: 5px;
  background-color: #DCDFE2;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 15px;
  color: black;
  padding-bottom: 15px;
`;

const TaskList = styled.div`
  transition: background-color 0.2s ease;
  min-height: 100px;
  flex-grow: 1;
  min-width: 300px;
`;

const NewTaskActivator = styled.div`
  cursor: pointer;
`;

const ItemInput = styled.input`
  height: 20px;
  margin-bottom: 10px;
`;

type WorkflowComponentProps = { +workflow: WorkflowType };

const Workflow = ({ workflow: { id, title, taskIds } }: WorkflowComponentProps) => {
  const tasks = useSelector(state => taskIds.map(taskId => state.tasks[taskId]));
  const [state, setState] = useState({
    addingNewTask: true,
  });

  function handleNewItemActivatorClick() {
    const newAddingState = !state.addingNewTask;

    setState({ addingNewTask: newAddingState });
  }

  function handleNewItemSubmit(e) {
    if (e.key === 'Enter') {
      handleNewItemActivatorClick();
    }
  }

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

      {state.addingNewTask && (
        <ItemInput onKeyDown={handleNewItemSubmit} />
      )}

      <NewTaskActivator onClick={handleNewItemActivatorClick}>
        {!state.addingNewTask ? dictionary.addNewTask : dictionary.cancel}
      </NewTaskActivator>
    </Container>
  );
};

export default Workflow;
