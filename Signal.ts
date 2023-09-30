export class Signal extends EventTarget{
    constructor(public propagator: EventTarget, public prop: string){
        super();
        propagator.addEventListener(prop, e => {
            this.dispatchEvent(new Event('value-changed'));
        })
    }

    
    get value(){
        const deref = (<any>this.propagator)?.targetRef?.deref();
        if(deref === undefined) return undefined;
        return deref[this.prop];
    }

    set value(nv: any){
        const deref = (<any>this.propagator)?.targetRef?.deref();
        if(deref === undefined) return;
        deref[this.prop] = nv;
    }
    
}