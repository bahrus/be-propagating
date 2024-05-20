import './behance.js';
import { BeHive } from 'be-hive/be-hive.js';
BeHive.registry.register({
    base: 'be-propagating',
    enhPropKey: 'bePropagating',
    map: {
        '0.0': 'ni'
    },
    do: {
        mount: {
            import: async () => {
                const { BePropagating } = await import('./be-propagating.js');
                return BePropagating;
            }
        }
    }
});
