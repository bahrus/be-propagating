// @ts-check
import { BeHive, MountObserver, seed } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types.d.ts' */

/**
 * @type {EMC}
 */
export const emc = {
    base: 'be-propagating',
    map: {
        '0.0': 'ni'
    },
    enhPropKey: 'bePropagating',
    importEnh: async () => {
        const { BePropagating } = await import('./be-propagating.js');
        return BePropagating;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
