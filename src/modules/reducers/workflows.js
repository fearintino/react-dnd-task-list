// @flow
import { ACTION_TYPES } from '../action';
import type { Action } from '../action';
import { makeNewIdsArray, moveIdBetweenArrays } from '../../utils/idsArrayHelper';

export type Workflow = {
  id: string,
  title: string,
  sort: number,
  taskIds: Array<string>,
};

type WorkflowState = {
  [string]: Workflow
};

const defaultState: WorkflowState = {
  'to-do': {
    id: 'to-do',
    title: 'To Do',
    taskIds: ['task-1', 'task-2'],
    sort: 0,
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: ['task-3', 'task-4'],
    sort: 1,
  },
  done: {
    id: 'done',
    title: 'Done',
    taskIds: ['task-5'],
    sort: 2,
  },
};

export default (state: WorkflowState = defaultState, { type, payload }: Action): WorkflowState => {
  if (typeof state === 'undefined') {
    return defaultState;
  }

  switch (type) {
    case ACTION_TYPES.NEW_TASK_ADDED: {
      const { task, workflowId } = payload;
      const workflow = state[workflowId];

      return {
        ...state,
        [workflowId]: {
          ...workflow,
          taskIds: [...workflow.taskIds, task.id],
        },
      };
    }
    case ACTION_TYPES.TASK_MOVED_IN_WORKFLOW: {
      const { source, destination, draggableId } = payload;
      const start = state[source.droppableId];

      return {
        ...state,
        [start.id]: {
          ...start,
          taskIds: makeNewIdsArray(start.taskIds, source.index, destination.index, draggableId),
        },
      };
    }
    case ACTION_TYPES.TASK_MOVED_BETWEEN_WORKFLOWS: {
      const { source, destination, draggableId } = payload;
      const start = state[source.droppableId];
      const finish = state[destination.droppableId];
      const { initialResult, destinationResult } = moveIdBetweenArrays(
        start.taskIds,
        source.index,
        finish.taskIds,
        destination.index,
        draggableId,
      );

      return {
        ...state,
        [start.id]: {
          ...start,
          taskIds: initialResult,
        },
        [finish.id]: {
          ...finish,
          taskIds: destinationResult,
        },
      };
    }
    default:
      return state;
  }
};
