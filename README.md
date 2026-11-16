# VX-COMPONENTS

A custom component library built with TypeScript, [Lit](https://lit.dev/) and Web Components.

The build produces two distributions. The test application (`index.html`, `src/test` and `public`) is used by `npm run dev` only and is not included in either distribution.

## Build

```shell
npm run build
```

- `dist/library` contains the developer package: ES module and CommonJS entry points, TypeScript declarations, and package metadata points to those outputs. Runtime dependencies are left external.
- `dist/standalone/vx-components.js` is a self-contained browser bundle with Lit and runtime dependencies included. It registers the custom elements when loaded.
- `npm run build:library` and `npm run build:standalone` build either distribution independently.

## Use as a component library

Install the published package in an application:

```shell
npm install vx-components
```

Import the components to register their custom elements and use their TypeScript classes:

```ts
import {VxButton, VxPanel, VxRoute, VxRouter, VxSvg} from 'vx-components'
```

The package also exports SVG helpers: `registerSvgLibrary`, `getSvgLibrary`, `hasSvgLibrary`, `svg`, `systemIcons`, and the `SVGLibrary` type.

## Use in a documentation site

Copy `dist/standalone/vx-components.js` into the separate documentation project's static assets, then load it on pages that show the examples:

```html
<script defer src="./assets/vx-components.js"></script>

<vx-panel>
  <vx-button></vx-button>
</vx-panel>
```

Adjust the script URL to match the documentation site's GitHub Pages base path. No Vite app, test sources, or public assets need to be copied.

Component documentation: [vx-docs](https://vpuska.github.io/vx-docs/).
