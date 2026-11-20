
import {LitElement, html, css} from 'lit'
import {customElement, query} from "lit/decorators.js";

import "./components/t-routing.ts";
import "./components/t-panels.ts";
import "./components/t-svg.ts";
import "./lib/test-icons.ts";


@customElement('t-index')
/**
 * Test suite menu
 */
export class TIndex extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
        :host {
            display: block;
            padding: 16px;
        }
        div#heading {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1em;
            height: 64px;
            padding-bottom: 1em;
            border-bottom: 1px solid;
        }
        div#heading vx-svg {
            background-color: transparent;
            border-radius: 8px;
        }
        div#theme {
            margin-left: auto;
        }
        div.buttons {
            display: inline-block;
        }
    `

    @query('#main') main!: HTMLElement;

    constructor() {
        super();
        console.log(">>> Constructing TestSuiteMenu");
    }
    runTest(evt: MouseEvent) {
        const element = evt.target as HTMLElement;
        const test = element.getAttribute('data-element');
        if (test) {
            console.log(">>> Running test:", test);
            navigation.navigate(`/${test}`);
        }
    }

    render() {
        return html`

            <div id="heading">
                <vx-svg button style="margin:0; height:3em" library="$system" name="favicon"
                    @click=${() => navigation.navigate("/")}   
                ></vx-svg>
                <h1>&lt;vx-components&gt;</h1>
                <div id="theme">
                    <button @click=${()=> {
                        document.documentElement.classList.add("vx-light-theme");
                        document.documentElement.classList.remove("vx-dark-theme");
                    }}>Light Theme
                    </button>
                    <button @click=${()=> {
                        document.documentElement.classList.add("vx-dark-theme");
                        document.documentElement.classList.remove("vx-light-theme");
                    }}>Dark Theme
                    </button>
                </div>
            </div>

            <vx-router id="main" reversed>

                <vx-route id="fred" path="/*splat">
                    Oops, no test found for that URL
                </vx-route>
                
                <vx-route path="/">
                    <h2>vx-panel</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="t-panels">Theming</button>
                    </div>

                    <h2>SVG Tests</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="t-svg">SVG Tests</button>
                    </div>

                    <h2>Router Tests</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="t-routing/component/">Router Tests</button>
                    </div>

                    <h2>Router Tests with #hash</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="t-routing/slotted/">Router Tests</button>
                    </div>
                </vx-route>

                <vx-route path="/t-panels">
                    <t-panels></t-panels>
                </vx-route>

                <vx-route path="/t-svg">
                    <t-svg></t-svg>
                </vx-route>
                
                <vx-route path="/t-routing/component" subroute component="t-routing">
                </vx-route>

                <vx-route path="/t-routing/slotted" subroute>
                    <t-routing></t-routing>
                </vx-route>
                
            </vx-router>
        `
    }
}


declare global {
    // noinspection JSUnusedGlobalSymbols
    interface HTMLElementTagNameMap {
        'tx-index': TIndex;
    }
}
