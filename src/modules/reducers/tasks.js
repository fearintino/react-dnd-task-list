// @flow
import type { Action } from '../action';
import { ACTION_TYPES } from '../action';

export type Task = {
  id: string,
  content: string,
};

type TasksState = {
  [string]: Task
};

const defaultState = {
  'task-1': { id: 'task-1', content: 'TEST 1' },
  'task-2': { id: 'task-2', content: 'TEST 2' },
  'task-3': { id: 'task-3', content: 'TEST 3' },
  'task-4': { id: 'task-4', content: 'TEST 4' },
  'task-5': { id: 'task-5', content: 'TEST 5' },
};

export default (state: TasksState = defaultState, { type, payload }: Action): TasksState => {
  if (typeof state === 'undefined') {
    return defaultState;
  }

  switch (type) {
    case ACTION_TYPES.NEW_TASK_ADDED: {
      const { task } = payload;

      return {
        ...state,
        [task.id]: task,
      };
    }

    default:
      return state;
  }
};
