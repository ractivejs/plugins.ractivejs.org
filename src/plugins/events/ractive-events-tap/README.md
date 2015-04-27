Tap/fastclick event plugin for Ractive - eliminates the 300ms delay on touch-enabled devices, and normalises across mouse, touch and pointer events.

<iframe width='100%' height='400' src='http://examples.ractivejs.org/embed/9d4afc54203b59df6c3a' scrolling='no' frameborder='0'></iframe>

## Why?

On mobile devices, using `on-click` isn't good enough. Tapping the touchscreen will fire a simulated click event, but only after a 300 millisecond delay, which makes your app feel sluggish. It also causes the tapped area to highlight, which in most cases looks a bit messy.

Instead, use `on-tap`. When you tap an area, the simulated click event will be prevented, and the user's action is responded to instantly. The `on-tap` event also differs from `on-click` in that the click event will (frankly rather bizarrely) fire even if you hold the mouse down over a single element for several seconds and waggle it about.

Pointer events are also supported, as is pressing the spacebar when the relevant element is focused (which triggers a click event, and is good for accessibility).