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
}

export interface BePropagating extends AllProps{}

const tagName = 'be-propagating';
const ifWantsToBe = 'propagating';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions:{

        }
    },
    superclass: BePropagating
});

register(ifWantsToBe, upgrade, tagName);