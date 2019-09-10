// @flow
export const ACTION_TYPES = {
  TASK_MOVED_IN_WORKFLOW: 'TASK_MOVED_IN_WORKFLOW',
  TASK_MOVED_BETWEEN_WORKFLOWS: 'TASK_MOVED_BETWEEN_WORKFLOWS',
  NEW_TASK_ADDED: 'NEW_TASK_ADDED',
};

// eslint-disable-next-line no-undef
export type ActionType = $Keys<typeof ACTION_TYPES>;

export type Action = {
  type: ActionType,
  payload: Object,
};

export type handleDragEndArg = {
  source: any,
  destination: any,
  draggableId: any,
};

export function handleDragEnd({ source, destination, draggableId }: handleDragEndArg) {
  return (dispatch: Function) => {
    if (source.droppableId === destination.droppableId) {
      return dispatch({
        type: ACTION_TYPES.TASK_MOVED_IN_WORKFLOW,
        payload: {
          source,
          destination,
          draggableId,
        },
      });
    }


    return dispatch({
      type: ACTION_TYPES.TASK_MOVED_BETWEEN_WORKFLOWS,
      payload: {
        source,
        destination,
        draggableId,
      },
    });
  };
}

export function handleNewTask(content: string, workflowId: string) {
  return (dispatch: Function) => dispatch({
    type: ACTION_TYPES.NEW_TASK_ADDED,
    payload: {
      task: {
        id: Math.random().toString(36).substring(7),
        content,
      },
      workflowId,
    },
  });
}
