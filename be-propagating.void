import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, PPP} from './types';
import { register } from 'be-hive/register.js';

export class BePropagating extends EventTarget implements Actions {
    async hydrate(pp: PP): Promise<PPP> {
        const {self, propagate, propagators} = pp;
        const {BePropagating: BP} = await import('trans-render/lib/bePropagating2.js');
        const newPropagators:  Map<string, EventTarget> = propagators || new Map<string, EventTarget>();
        for(const propagatePath of propagate!){
            if(newPropagators.has(propagatePath)) continue;
            if(propagatePath === 'self'){
                const propagator = new BP(self);
                newPropagators.set(propagatePath, propagator);
            }else{
                const {homeInOn} = await import('trans-render/lib/homeInOn.js');
                const target = await homeInOn(self, propagatePath);
                const propagator = new BP(target);
                newPropagators.set(propagatePath, propagator);
            }
        }
        return {
            propagators: newPropagators,
            resolved: true
        } as PPP;
    }

    async addPath(path: string){
        debugger;
    }
}

const tagName = 'be-propagating';
const ifWantsToBe = 'propagating';
const upgrade = 'template';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            virtualProps: ['propagate', 'propagators'],
            proxyPropDefaults:{
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