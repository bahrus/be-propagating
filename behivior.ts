import {BeHive, EMC, MountObserver, seed} from 'be-hive/be-hive.js';

export const emc: EMC = {
    base: 'be-propagating',
    map: {
        '0.0': 'ni'
    },
    enhPropKey: 'bePropagating',
    importEnh: async () => {
        const {BePropagating} = await import('./behance.js');
        return BePropagating;
    }
};

const mose = seed(emc);

MountObserver.synthesize(document, BeHive, mose);
