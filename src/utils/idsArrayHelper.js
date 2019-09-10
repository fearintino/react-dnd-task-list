// @flow

export const makeNewIdsArray = (
  sourceIds: Array<string>,
  sourceIndex: number,
  destinationIndex: number,
  newId: string,
): Array<string> => {
  const result = Array.from(sourceIds);
  result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, newId);

  return result;
};

type MoveIdBetweenArraysResult = {
  initialResult: Array<string>,
  destinationResult: Array<string>,
};

export const moveIdBetweenArrays = (
  sourceIds: Array<string>,
  sourceIndex: number,
  destinationIds: Array<string>,
  destinationIndex: number,
  id: string,
): MoveIdBetweenArraysResult => {
  const initialResult = Array.from(sourceIds);
  initialResult.splice(sourceIndex, 1);

  const destinationResult = Array.from(destinationIds);
  destinationResult.splice(destinationIndex, 0, id);

  return { initialResult, destinationResult };
};
