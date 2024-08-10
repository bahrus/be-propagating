// @ts-check
import { resolved, rejected, propInfo} from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
/** @import {AP, Actions} from './ts-refs/be-propagating/types' */

/**
 * @implements {Actions}
 */
class BePropagating extends BE {
    static config = {
        propDefaults: {
            propagate: ['self']
        },
        propInfo: {
            ...propInfo,
            propagators: {},
        },
        actions: {
            hydrate: {
                ifAllOf: 'propagate'
            }
        }
    };
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
    #previousTS = new Map();
    async setKeyVal(key, val, tsKey = 'timestamp') {
        const { propagators } = 
        /** @type {AP} */
        /** @type {any} */
        (this);
        //const ts = val[tsKey];
        if (propagators.has(key))
            return propagators.get(key);
        const { BePropagating: BP } = await import('trans-render/lib/bePropagating2.js');
        const propagator = new BP(val);
        propagators.set(key, propagator);
        this.dispatchEvent(new Event(key));
        return propagator;
    }
    getPropagator(key) {
        return new Promise((resolve, reject) => {
            const { propagators } = 
            /** @type {AP} */
            /** @type {any} */
            (this);
            if (propagators.has(key)) {
                resolve(propagators.get(key));
                return;
            }
            this.addEventListener(key, e => {
                resolve(propagators.get(key));
            });
        });
    }
    async getGate(prop, key) {
        const { Gate } = await import('./Gate.js');
        const propagator = await this.getPropagator(key || 'self');
        return new Gate(propagator, prop);
    }
}
await BePropagating.bootUp();
export { BePropagating };
