import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP} from './types';
import {register} from 'be-hive/register.js';

export class BePropagating extends BE<AP, Actions> implements Actions{

    static  override get beConfig(){
        return {
            parse: true,
        } as BEConfig
    }


    async hydrate(self: this): ProPAP {
        const {enhancedElement, propagate, propagators} = self;
        //console.log(enhancedElement)
        const {BePropagating: BP} = await import('trans-render/lib/bePropagating2.js');
        const newPropagators:  Map<string, EventTarget> = propagators || new Map<string, EventTarget>();
        for(const propagatePath of propagate!){
            if(newPropagators.has(propagatePath)) continue;
            if(propagatePath === 'self'){
                const propagator = new BP(enhancedElement);
                newPropagators.set(propagatePath, propagator);
            }else{
                const {homeInOn} = await import('trans-render/lib/homeInOn.js');
                const target = await homeInOn(enhancedElement, propagatePath);
                const propagator = new BP(target);
                newPropagators.set(propagatePath, propagator);
            }
        }
        //console.log({enhancedElement, newPropagators});
        return {
            propagators: newPropagators,
            resolved: true
        } as PAP;
    }
    #previousTS = new Map<string, string | number>();
    async setKeyVal(key: string, val: any, tsKey: string | undefined = 'timestamp'): Promise<EventTarget> {
        const {propagators} = this;
        //const ts = val[tsKey];
        if(propagators.has(key)) return propagators.get(key) as EventTarget;
        const {BePropagating: BP} = await import('trans-render/lib/bePropagating2.js');
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

    getPropagator(key: string): Promise<EventTarget>{
        return new Promise((resolve, reject) => {
            const {propagators} = this;
            if(propagators.has(key)) {
                resolve(propagators.get(key)!);
                return;
            }
            this.addEventListener(key, e => {
                resolve(propagators.get(key)!);
            })
        })

    }

    async getSignal(prop: string, key?: string){
        const {Signal} = await import('./Signal.js');
        const propagator = await this.getPropagator(key || 'self');
        return new Signal(propagator, prop);
    }
}

export interface BePropagating extends AllProps{}

const tagName = 'be-propagating';
const ifWantsToBe = 'propagating';
const upgrade = '*';

const xe = new XE<AP, Actions>({
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
        actions:{
            hydrate: 'propagate'
        }
    },
    superclass: BePropagating
});

register(ifWantsToBe, upgrade, tagName);