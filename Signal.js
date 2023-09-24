export class Signal extends EventTarget {
    propagator;
    prop;
    constructor(propagator, prop) {
        super();
        this.propagator = propagator;
        this.prop = prop;
        propagator.addEventListener(prop, e => {
            this.#value = propagator[prop];
            this.dispatchEvent(new Event('value-changed'));
        });
    }
    #value;
    get value() {
        return this.#value;
    }
    set value(nv) {
        this.#value = nv;
    }
}
