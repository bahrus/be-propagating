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
    #previousTS = new Map();
    async setKeyVal(key, val, tsKey = 'timestamp') {
        const { propagators } = this;
        //const ts = val[tsKey];
        if (propagators.has(key))
            return propagators.get(key);
        const { BePropagating: BP } = await import('trans-render/lib/bePropagating2.js');
        const propagator = new BP(val);
        propagators.set(key, propagator);
        this.dispatchEvent(new Event(key));
        return propagator;
        // if(propagators.has(key)){
        //     const propagator = propagators.get(key);
        //     return propagator;
        //     //TODO support timestamp check
        //     // if(this.#previousTS.has(key) && this.#previousTS.get(key) === ts) return;
        //     // this.#previousTS.set(key, ts);
        // }
    }
    getPropagator(key) {
        return new Promise((resolve, reject) => {
            const { propagators } = this;
            if (propagators.has(key)) {
                resolve(propagators.get(key));
                return;
            }
            this.addEventListener(key, e => {
                resolve(propagators.get(key));
            });
        });
    }
    async getSignal(prop, key) {
        const { Signal } = await import('./Signal.js');
        const propagator = await this.getPropagator(key || 'self');
        return new Signal(propagator, prop);
    }
}
const tagName = 'be-propagating';
const ifWantsToBe = 'propagating';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
            propagate: ['self']
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            hydrate: 'propagate'
        }
    },
    superclass: BePropagating
});
register(ifWantsToBe, upgrade, tagName);
