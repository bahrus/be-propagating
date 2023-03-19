import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BePropagating extends EventTarget {
    async hydrate(pp) {
        const { self, propagate, propagators } = pp;
        const { BePropagating: BP } = await import('trans-render/lib/bePropagating2.js');
        const newPropagators = propagators || new Map();
        for (const propagatePath of propagate) {
            if (newPropagators.has(propagatePath))
                continue;
            if (propagatePath === 'self') {
                const propagator = new BP(self);
                newPropagators.set(propagatePath, propagator);
            }
            else {
                const { homeInOn } = await import('trans-render/lib/homeInOn.js');
                const target = await homeInOn(self, propagatePath);
                const propagator = new BP(target);
                newPropagators.set(propagatePath, propagator);
            }
        }
        return {
            propagators: newPropagators,
            resolved: true
        };
    }
    async addPath(path) {
        debugger;
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
            virtualProps: ['propagate', 'propagators'],
            proxyPropDefaults: {
                propagate: ['self']
            }
        },
        actions: {
            hydrate: 'propagate'
        }
    },
    complexPropDefaults: {
        controller: BePropagating
    }
});
register(ifWantsToBe, upgrade, tagName);
