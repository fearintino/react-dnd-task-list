// @flow
import { Types } from '../action';
import type { Action } from '../action';

export type Workflow = {
  id: string,
  title: string,
  taskIds: Array<string>
};

type WorkflowState = {
  [string]: Workflow
};

const defaultState: WorkflowState = {
  'to-do': {
    id: 'to-do',
    title: 'To Do',
    taskIds: ['task-1', 'task-2'],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: ['task-3', 'task-4'],
  },
  done: {
    id: 'Done',
    title: 'Done',
    taskIds: ['task-5'],
  },
};

export default (state: WorkflowState = defaultState, { type, payload }: Action): WorkflowState => {
  if (typeof state === 'undefined') {
    return defaultState;
  }

  switch (type) {
    case Types.DRAG_ENDED: {
      const workflow = state[payload.workflowId];
      const newIdsArray = Array.from(workflow.taskIds);
      newIdsArray.splice(payload.sourceIndex, 1);
      newIdsArray.splice(payload.destinationIndex, 0, payload.draggableId);

      return {
        ...state,
        [workflow.id]: {
          ...workflow,
          taskIds: newIdsArray,
        },
      };
    }
    default:
      return state;
  }
};
