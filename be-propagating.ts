import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, VirtualProps, Proxy, PPP} from './types';
import { register } from 'be-hive/register.js';

export class BePropagating extends EventTarget implements Actions {
    async hydrate(pp: PP): Promise<PPP> {
        const {self} = pp;
        const {BePropagating} = await import('trans-render/lib/bePropagating2.js');
        const propagator = new BePropagating(self);
        return {
            propagator,
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
            virtualProps: ['propagate']
        }
    }
});

register(ifWantsToBe, upgrade, tagName);