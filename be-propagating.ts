import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP, ProPAP, PAP} from './types';
import {IEnhancement,  BEAllProps} from 'trans-render/be/types';
import {dispatchEvent} from 'trans-render/positractions/dispatchEvent.js';

export class BePropagating extends BE implements Actions{
    static override config: BEConfig<AllProps & BEAllProps, Actions & IEnhancement, any> = {

    }
}

export interface BePropagating extends AP{}