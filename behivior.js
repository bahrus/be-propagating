import { BeHive } from 'be-hive/be-hive.js';
import { MountObserver } from 'mount-observer/MountObserver.js';
const base = 'be-propagating';
const emc = {
    base,
    map: {
        '0.0': 'ni'
    },
    enhPropKey: 'bePropagating',
    importEnh: async () => {
        const { BePropagating } = await import('./behance.js');
        return BePropagating;
    }
};
const mose = document.createElement('script');
mose.id = base;
mose.synConfig = emc;
MountObserver.synthesize(document, BeHive, mose);
