import {LitElement, html, css} from 'lit'
import {customElement, query} from "lit/decorators.js";

import "../components/vx-panel/vx-panel.test.ts";
import "../components/vx-svg/vx-svg.test.ts";
import "../components/vx-router/vx-router.test.ts";
import "../components/vx-router/vx-router.ts";
import "../components/vx-route/vx-route.ts";

@customElement('test-suite-menu')
export class TestSuiteMenu extends LitElement {

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
                        <button data-element="test-vx-panel-theming">Theming</button>
                    </div>

                    <h2>SVG Tests</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="test-vx-svg">SVG Tests</button>
                    </div>

                    <h2>Router Tests</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="test-vx-router/component/">Router Tests</button>
                    </div>

                    <h2>Router Tests with #hash</h2>
                    <div class="buttons" @click=${this.runTest}>
                        <button data-element="test-vx-router/slotted/">Router Tests</button>
                    </div>
                </vx-route>

                <vx-route path="/test-vx-panel-theming">
                    <test-vx-panel-theming></test-vx-panel-theming>
                </vx-route>

                <vx-route path="/test-vx-svg">
                    <test-vx-svg></test-vx-svg>
                </vx-route>
                
                <vx-route path="/test-vx-router/component" subroute component="test-vx-router">
                </vx-route>

                <vx-route path="/test-vx-router/slotted" subroute>
                    <test-vx-router></test-vx-router>
                </vx-route>
                
            </vx-router>
        `
    }
}


declare global {
    // noinspection JSUnusedGlobalSymbols
    interface HTMLElementTagNameMap {
        'test-suite-menu': TestSuiteMenu;
    }
}
