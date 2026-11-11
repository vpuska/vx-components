import {LitElement, html, css} from 'lit'
import {customElement, property, queryAssignedNodes} from 'lit/decorators.js'
import {classMap} from 'lit/directives/class-map.js'


// blend the text color and panel color together.
function colorMix(percent: number) {
    return css`color-mix(in oklab, var(--vx-text-color) ${percent}%, var(--vx-panel-color))`;
}

// set colors for the panel.
function assignColors(percent: number) {
    return css`
        --background-color: ${colorMix(percent)};
        --border-color: ${colorMix(percent+25)};
        color: contrast-color(var(--background-color));
        background-color: var(--background-color);
        border-color: var(--border-color);
    `
}

/**
 * A nestable container for a logical grouping of content. When nested, the panel's colors
 * can be adjusted using the level attribute. 0 is the bottom-most level.  Higher levels
 * lighten or darken the panel depending on whether the theme is light or dark.
 * ### Slots
 * - `header` - The header of the panel.
 * - `footer` - The footer of the panel.
 * ### CSS Properties
 * - `--vx-panel-color` - The background color of the panel
 * - `--vx-text-color` - The text color of the panel`
 */
@customElement('vx-panel')
export class VxPanel extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
        :host {
            display: block;
            padding: 0;
            margin: 1em;
            border-radius: 0.5em;
            border: 1px solid;
            --border-color: none;
            --background-color: none;
            ${assignColors(0)}
        }
        :host([level="1"]) { ${assignColors(10)} }
        :host([level="2"]) { ${assignColors(20)} }
        :host([level="3"]) { ${assignColors(30)} }
        :host([level="4"]) { ${assignColors(40)} }
        :host([level="5"]) { ${assignColors(50)} }
        :host([level="6"]) { ${assignColors(60)} }
        
        div {
            padding: 0.5em;
        }
        
        div#header, div#footer {
            border: none;
        }
        div#body.has-header {
            border-top: 1px solid var(--border-color);
        }
        div#body.has-footer {
            border-bottom: 1px solid var(--border-color);
        }
    `
    /**
     * The attribute `level` represents the panel's hierarchy level on the page.  The base level `0` (default) is
     * the bottom-most level.
     *
     * A value of `0` typically indicates the initial or base level. The
     * interpretation of the levels may vary depending on the specific application
     * or domain.
     *
     * It is expected to hold numerical values, where each increment or decrement
     * symbolizes progression or regression in the sequence of levels.
     */
    @property({type: Number}) level: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

    @queryAssignedNodes({slot: 'header', flatten: true}) headerNodes!: Array<Node>;
    @queryAssignedNodes({slot: 'footer', flatten: true}) footerNodes!: Array<Node>;

    render() {
        return html`
            <div id="header">
                <slot name="header" @slotchange=${() => this.requestUpdate()}></slot>
            </div>
            <div id="body" class=${classMap({
                'has-header': this.headerNodes.length > 0,
                'has-footer': this.footerNodes.length > 0
            })}>
                <slot></slot>
            </div>
            <div id="footer">
                <slot name="footer" @slotchange=${() => this.requestUpdate()}></slot>
            </div>
        `
    }
}


declare global {
    // noinspection JSUnusedGlobalSymbols
    interface HTMLElementTagNameMap {
        'vx-panel': VxPanel;
    }
}
