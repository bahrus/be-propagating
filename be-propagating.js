import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BePropagating extends BE {
    static get beConfig() {
        return {
            parse: true,
        };
    }
    async hydrate(self) {
        const { enhancedElement, propagate, propagators } = self;
        const { BePropagating: BP } = await import('trans-render/lib/bePropagating2.js');
        const newPropagators = propagators || new Map();
        for (const propagatePath of propagate) {
            if (newPropagators.has(propagatePath))
                continue;
            if (propagatePath === 'self') {
                const propagator = new BP(enhancedElement);
                newPropagators.set(propagatePath, propagator);
            }
            else {
                const { homeInOn } = await import('trans-render/lib/homeInOn.js');
                const target = await homeInOn(enhancedElement, propagatePath);
                const propagator = new BP(target);
                newPropagators.set(propagatePath, propagator);
            }
        }
        return {
            propagators: newPropagators,
            resolved: true
        };
    }
}
const tagName = 'be-propagating';
const ifWantsToBe = 'propagating';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {}
    },
    superclass: BePropagating
});
register(ifWantsToBe, upgrade, tagName);
