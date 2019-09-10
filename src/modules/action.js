// @flow
export const Types = {
  DRAG_ENDED: 'DRAG_ENDED',
};

export type Action = {
  type: string,
  payload: Object,
};

export type handleDragEndArgs = {
  source: any,
  destination: any,
  draggableId: any,
};

export function handleDragEnd({ source, destination, draggableId }: handleDragEndArgs) {
  return (dispatch: Function) => {
    const { index: sourceIndex, droppableId: workflowId } = source;
    const { index: destinationIndex } = destination;

    return dispatch({
      type: Types.DRAG_ENDED,
      payload: {
        sourceIndex,
        workflowId,
        destinationIndex,
        draggableId,
      },
    });
  };
}
