export class Signal extends EventTarget{
    constructor(public propagator: EventTarget, public prop: string){
        super();
        propagator.addEventListener(prop, e => {
            this.#value = propagator[prop];
            this.dispatchEvent(new Event('value-changed'));
        })
    }

    #value: any;
    get value(){
        return this.#value;
    }
    set value(nv: any){
        this.#value = nv;
    }
}