import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig, propDefaults} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP, ProPAP, PAP} from './types';
import {IEnhancement,  BEAllProps} from 'trans-render/be/types';

export class BePropagating extends BE implements Actions{
    static override config: BEConfig<AllProps & BEAllProps, Actions & IEnhancement, any> = {
        propDefaults:{
            propagate: ['self']
        },
        propInfo:{
            ...(beCnfg.propInfo)
        },
        actions:{
            hydrate: {
                ifAllOf: 'propagate'
            }
        }
    }

    async hydrate(self: this): ProPAP {
        const {enhancedElement, propagate, propagators} = self;
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

    async getGate(prop: string, key?: string){
        const {Gate} = await import('./Gate.js');
        const propagator = await this.getPropagator(key || 'self');
        return new Gate(propagator, prop);
    }
}

export interface BePropagating extends AP{}