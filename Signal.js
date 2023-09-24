export class Signal extends EventTarget {
    propagator;
    prop;
    constructor(propagator, prop) {
        super();
        this.propagator = propagator;
        this.prop = prop;
        propagator.addEventListener(prop, e => {
            this.dispatchEvent(new Event('value-changed'));
        });
    }
    get value() {
        const deref = this.propagator?.targetRef?.deref();
        if (deref === undefined)
            return undefined;
        return deref[this.prop];
    }
}
