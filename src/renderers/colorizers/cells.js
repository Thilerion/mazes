import { STATE_GENERATING } from '../../constants';

const isGenerating = state => state === STATE_GENERATING;

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