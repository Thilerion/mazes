import { STATE_GENERATING, STATE_BASE, STATE_SOLVING } from '../../constants';

const isGenerating = state => state === STATE_GENERATING;
const isBase = state => state === STATE_BASE;
const isSolving = state => state === STATE_SOLVING;

export const showCurrentCell = (cell, { data, state }) => {
	return isGenerating(state) && data.currentCells.includes(cell);
}
export const showUnvisitedCell = (cell, { state }) => {
	return isGenerating(state) && !cell.initialized;
}

export const showFinishCell = (cell, {state, colorSettings}) => {
	return !isGenerating(state) && !isSolving(state) && cell.isFinish && colorSettings.showFinish;
}
export const showRootCell = (cell, {state, colorSettings}) => {
	return !isGenerating(state) && !isSolving(state) && cell.isRoot && colorSettings.showRoot;
}

export const showDistanceColor = (cell, { state, data, colorSettings }) => {
	if (isBase(state)) {
		return colorSettings.showDistances && data.distancesCalculated;
	}
	if (isSolving(state)) {
		return colorSettings.showDistances && data.distanceMap.has(cell);
	}
	return false;
}

export const showHuntAndKillRowCell = (cell, { state, data }) => {
	return isGenerating(state) && data.huntAndKillRow.includes(cell);
};

export const showInStackCell = (cell, { state, data }) => {
	return isGenerating(state) && !data.currentCells.includes(cell) && data.inStack.includes(cell);
}