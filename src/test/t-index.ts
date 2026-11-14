import {LitElement, html, css} from 'lit'
import {customElement, query} from "lit/decorators.js";

import "../components/vx-router/vx-router.ts";
import "../components/vx-route/vx-route.ts";

import "./components/t-panels.ts";
import "./components/t-routing.ts";
import "./components/t-svg.ts";

@customElement('t-index')
export class TIndex extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
        :host {
            display: block;
            padding: 16px;
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

            <vx-router id="main" reversed>

                <vx-route id="fred" path="/*splat">
                    Oops, no test found for that URL
                </vx-route>
                
                <vx-route path="/">
                    <h2>Theme</h2>
                    <div class="buttons">
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

