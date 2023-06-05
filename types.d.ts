import {ActionOnEventConfigs} from 'trans-render/froop/types';
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    propagate?: string[],
}

export interface AllProps extends EndUserProps{
    propagators: Map<string, EventTarget>;
    
}

export type AP = AllProps;
export type PAP = Partial<AP>;
export type ProPAP = Promise<PAP>;


export interface Actions{
    hydrate(self: this): ProPAP;
    setKeyVal(key: string, val: any, tsKey?: string): Promise<EventTarget>;
}