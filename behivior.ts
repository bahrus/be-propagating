import {BeHive, EnhancementMountCnfg} from 'be-hive/be-hive.js';
import {MountObserver, MOSE} from 'mount-observer/MountObserver.js';

const base = 'be-propagating';
export const emc: EnhancementMountCnfg = {
    base,
    map: {
        '0.0': 'ni'
    },
    enhPropKey: 'bePropagating',
    importEnh: async () => {
        const {BePropagating} = await import('./behance.js');
        return BePropagating;
    }
};

const mose = document.createElement('script') as MOSE<EnhancementMountCnfg>;
mose.id = base;
mose.synConfig = emc;

MountObserver.synthesize(document, BeHive, mose);
