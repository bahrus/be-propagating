import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps {
    propsToWatch: string[];
}

export interface VirtualProps extends EndUserProps, MinimalProxy{

}

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy;
}



export interface Actions{
}