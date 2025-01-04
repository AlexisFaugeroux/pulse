import JSONpresets from './presets.json';
import { PresetsSchema } from '../validation/PresetsSchema';

export const presets = PresetsSchema.parse(JSON.parse(JSON.stringify(JSONpresets)));
