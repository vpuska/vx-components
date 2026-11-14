import {LitElement, html, css,} from 'lit'
import {customElement} from "lit/decorators.js";
import {svg} from "../../lib/svg.ts";
import "../../components/vx-svg/vx-svg.ts";

@customElement('t-svg')
export class TestSVG extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
        vx-svg.small {
            width: 1em;
            height: 1em;
        }
        vx-svg.medium {
            width: 2em;
            height: 2em;
        }
        vx-svg.large {
            width: 1em;
            height: 1em;     
            transform: translate(0, 32px);
        }
        div {
            border: 1px solid black;
            border-radius: 5px;
            padding: 1em;
            margin: 1em;
        }
    `

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        const root = super.createRenderRoot();
        root.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            alert("click event received from: " + target.tagName + " id=" + target.id);
        })
        return root;
    }

    render() {
        return html`
            <div style="font-size: 3em;">
                <h1>library=$system, font-size=1rem</h1>
                <vx-svg button library="$system" name="bootstrap"></vx-svg>
                ${svg("$system.bootstrap")}
                A
                <vx-svg button id="fred" library="$system" name="bootstrap-fill"></vx-svg>
                B
                <vx-svg button library="$system" name="bicycle"></vx-svg>
                C
                <vx-svg button library="$system" name="this-should-error!"></vx-svg>
                D
                <vx-svg button library="$system" name="home"></vx-svg>
                E
                <vx-svg button library="$system" name="motion"></vx-svg>
            </div>
            <div style="color: red;">
                <h1>library=$system, color=red</h1>
                <vx-svg button id = "bill" library="$system" name="bootstrap"></vx-svg>
                <vx-svg library="$system" name="bootstrap-fill"></vx-svg>
                <vx-svg library="$system" name="bicycle"></vx-svg>
                <vx-svg library="$system" name="this-should-error!"></vx-svg>
            </div>
            <div>
                <h1>library=$system, width+height</h1>
                <vx-svg class="small" library="$system" name="bootstrap"></vx-svg>
                <vx-svg class="medium" library="$system" name="bootstrap"></vx-svg>
                <vx-svg class="large" library="$system" name="bootstrap"></vx-svg>
                </span>
            </div>
            <div style="color:blue">
                <h1>library=$system, font-size, color=blue</h1>
                <vx-svg style="font-size: 1em;" library="$system" name="bootstrap"></vx-svg>
                <vx-svg style="font-size: 2em;" library="$system" name="bootstrap"></vx-svg>
                <vx-svg style="font-size: 3em;" library="$system" name="bootstrap"></vx-svg>
            </div>
       `
    }
}
