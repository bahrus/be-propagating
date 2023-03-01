import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, PPP} from './types';
import { register } from 'be-hive/register.js';

export class BePropagating extends EventTarget implements Actions {
    async hydrate(pp: PP): Promise<PPP> {
        const {self, propagate} = pp;
        const {BePropagating: BP} = await import('trans-render/lib/bePropagating2.js');
        const propagators:  {[key: string]: EventTarget} = {};
        for(const propagatePath of propagate!){
            if(propagatePath === 'self'){
                const propagator = new BP(self);
                propagators['self'] = propagator;
            }else{
                const {homeInOn} = await import('trans-render/lib/homeInOn.js');
                const target = await homeInOn(self, propagatePath);
                const propagator = new BP(target);
                propagators[propagatePath] = propagator;
            }
        }
        return {
            propagators,
            resolved: true
        } as PPP;
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
    }
});

register(ifWantsToBe, upgrade, tagName);