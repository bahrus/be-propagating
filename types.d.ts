import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps {
    propagate: string[];
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    propagator: EventTarget;
}

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy;
}

export type PPP = Partial<PP>;


export interface Actions{
    hydrate(pp: PP): Promise<PPP>
}