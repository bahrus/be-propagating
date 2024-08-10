//@ts-check

export class Gate extends EventTarget {
    /**
     * @type {EventTarget}
     */
    propagator;
    /**
     * @type {string}
     */
    prop;
    /**
     * 
     * @param {EventTarget} propagator 
     * @param {string} prop 
     */
    constructor(propagator, prop) {
        super();
        this.propagator = propagator;
        this.prop = prop;
        propagator.addEventListener(prop, e => {
            this.dispatchEvent(new Event('value-changed'));
        });
    }
    get value() {
        const deref = /** @type {any} */
        (this.propagator)
        ?.targetRef?.deref();
        if (deref === undefined)
            return undefined;
        return deref[this.prop];
    }
    set value(nv) {
        const deref = 
            /** @type {any} */
            (this.propagator)
            ?.targetRef?.deref();
        if (deref === undefined)
            return;
        deref[this.prop] = nv;
    }
}
