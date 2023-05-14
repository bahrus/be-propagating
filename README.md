# be-propagating

be-propagating creates a subscribable EventTarget, which watches for changes to a provided list of properties of the element it adorns, and the event target emits events with the same name every time the property value changes.

## Lingo

In the examples below, we assume some-element is a custom element that has property setters myProp1, myProp2

## JSON Lingo

```html
<some-element be-propagating='
    "propagate": ["myProp1", "myProp2"]
'></some-element>
```

<!--
## Hemingway Lingo

```html
<some-element be-propagating='

'></some-element>
```
-->



The EventTarget object can be obtained from someElement.beDecorated.propagating.propagator.

