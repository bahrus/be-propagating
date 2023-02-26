import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BePropagating extends EventTarget {
    async hydrate(pp) {
        const { self } = pp;
        const { BePropagating } = await import('trans-render/lib/bePropagating2.js');
        const propagator = new BePropagating(self);
        return {
            propagator,
            resolved: true
        };
    }
}
const tagName = 'be-propagating';
const ifWantsToBe = 'propagating';
const upgrade = 'template';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps: ['propagate']
        }
    }
});
register(ifWantsToBe, upgrade, tagName);
