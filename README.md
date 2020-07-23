# ABC Tooltip

## Installation
Download and include `abc-tooltip.min.js` & `abc-tooltip.min.css` in your HTML file.

```html
<link rel="stylesheet" href="/path/to/abc-tooltip.css">

<script src="/path/to/abc-tooltip.min.js"></script>
```

## Usage
```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulam
  <span id="tooltip-1">i</span> ex dolor.
</p>
```
```js
const tt1 = document.getElementById('tooltip-1');

new AbcTooltip({
  target: tt1,
  content: 'Vivamus sed placerat felis, sit amet scelerisque mi.',
  gap: 2
});
```
Or

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulam 
  <span 
    data-abc-tt-content="<b>Vivamus pharetra augue et ipsum tincidunt</b>"
    data-abc-tt-html="true" 
    data-abc-tt-position="left" 
    data-abc-tt-event="click" 
    data-abc-tt-gap="10">
    i
  </span> ex dolor.
</p>
```
```js
new AbcTooltip();
```

## Options
<table>
  <tr>
    <th>Option</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>target</td>
    <td>HTMLElement</td>
    <td>null</td>
    <td>Targeted HTMLElement.</td>
  </tr>
  <tr>
    <td>content</td>
    <td>string</td>
    <td>null</td>
    <td>Content of the Tooltip.</td>
  </tr>
  <tr>
    <td>html</td>
    <td>boolean</td>
    <td>false</td>
    <td>Render content as HTML.</td>
  </tr>
  <tr>
    <td>position</td>
    <td>string</td>
    <td>top</td>
    <td>Positions of the Tooltip. Available options: <i>top</i>, <i>bottom</i>, <i>left</i> & <i>right</i></td>
  </tr>
  <tr>
    <td>event</td>
    <td>string</td>
    <td>hover</td>
    <td>Display Tooltip when this event has occurred. Available options: <i>hover</i> & <i>click</i></td>
  </tr>
  <tr>
    <td>Gap</td>
    <td>number</td>
    <td>0</td>
    <td>Space between Tooltip and the Targeted HTML element.</td>
  </tr>
</table>

## License
[MIT license](http://www.opensource.org/licenses/MIT)