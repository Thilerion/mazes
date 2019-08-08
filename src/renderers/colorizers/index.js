import { default as Colorizer } from './base';
import { default as GenerationColorizer } from './generation';

export const COLORIZER_BASE = "BASE";
export const COLORIZER_GENERATION = "GENERATION";

export const COLORIZERS = {
	[COLORIZER_BASE]: Colorizer,
	[COLORIZER_GENERATION]: GenerationColorizer
};