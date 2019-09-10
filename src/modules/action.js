// @flow
export const ACTION_TYPES = {
  TASK_MOVED_IN_WORKFLOW: 'TASK_MOVED_IN_WORKFLOW',
  TASK_MOVED_BETWEEN_WORKFLOWS: 'TASK_MOVED_BETWEEN_WORKFLOWS',
};

// eslint-disable-next-line no-undef
export type ActionType = $Keys<typeof ACTION_TYPES>;

export type Action = {
  type: ActionType,
  payload: Object,
};

export type handleDragEndArgs = {
  source: any,
  destination: any,
  draggableId: any,
};

export function handleDragEnd({ source, destination, draggableId }: handleDragEndArgs) {
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
