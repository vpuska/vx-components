import {LitElement, html, css} from 'lit'
import {customElement} from 'lit/decorators.js'
import {readableColor} from "color2k";


@customElement('vx-button')
export class VxButton extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`

        :host {
            background-color: var(--accent-color);
            color: var(--text-color);
        }
        button {
            width: 20em;
            background-color: inherit;
            color: inherit;
            height: 3em;
        }
    `
    connectedCallback() {
        super.connectedCallback();
        console.log("Connected to VxButton");
        const backgroundColor = window.getComputedStyle(this).getPropertyValue('background-color');
        console.log("Background color:", backgroundColor);
        const color = readableColor(backgroundColor);
        console.log("Readable color:", color);
        //this.style.setProperty('color', color);
    }

    render() {
        console.log("Rendering VxButton");
        return html`
            <button>The Mutton Button</button>
        `
    }
}


declare global {
    // noinspection JSUnusedGlobalSymbols
    interface HTMLElementTagNameMap {
        'vx-button': VxButton;
    }
}
