import { STATE_GENERATING, STATE_BASE } from '../../constants';

const isGenerating = state => state === STATE_GENERATING;
const isBase = state => state === STATE_BASE;

export const showCurrentCell = (cell, { data, state }) => {
	return isGenerating(state) && data.currentCells.includes(cell);
}
export const showUnvisitedCell = (cell, { state }) => {
	return isGenerating(state) && !cell.initialized;
}

export const showFinishCell = (cell, {state, colorSettings}) => {
	return !isGenerating(state) && cell.isFinish && colorSettings.showFinish;
}
export const showRootCell = (cell, {state, colorSettings}) => {
	return !isGenerating(state) && cell.isRoot && colorSettings.showRoot;
}

export const showDistanceColor = (cell, { state, data, colorSettings }) => {
	return isBase(state) && colorSettings.showDistances && data.distancesCalculated;
}