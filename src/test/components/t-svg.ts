import {LitElement, html, css, nothing,} from 'lit'
import {customElement, state, queryAll, query} from "lit/decorators.js";
import "../../components/vx-svg/vx-svg.ts";
import {testIcons, defaultIcons} from "../lib/test-icons.ts"
import type {SVGLibrary} from "../../lib/svg/svg-register.ts";
import VxSvg from "../../components/vx-svg/vx-svg.ts";

@customElement('t-svg')
export class TestSVG extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
        div {
            display: flex;
            flex-flow: row wrap;
            gap: 24px;
            border: 1px solid black;
            border-radius: 5px;
            padding: 1em;
            margin: 1em;
        }
        
        div#icons.fontsize-1 vx-svg { font-size: 2em; }
        div#icons.fontsize-2 vx-svg { font-size: 4em; }
        div#icons.fontsize-3 vx-svg { font-size: 8em; }
        div#icons.size-1 vx-svg { height: 18px; width: 18px; }
        div#icons.size-2 vx-svg { height: 36px; width: 36px; }
        div#icons.size-3 vx-svg { height: 48px; width: 48px; }
        
        div#icons.color-1 vx-svg { color: var(--vx-text-color); }
        div#icons.color-2 vx-svg { color: red; }
        div#icons.color-3 vx-svg { color: green; }
        div#icons.color-4 vx-svg { color: blue; }
    `

    @state() lib: SVGLibrary = defaultIcons;
    @state() libName: string = "default";
    @state() buttonMode: boolean = false;
    @state() buttonClicked: string = "";

    @query("div#icons") iconsDiv!: HTMLDivElement;
    @queryAll("select#size option") sizeOptions!: NodeListOf<HTMLOptionElement>;
    @queryAll("select#color option") colorOptions!: NodeListOf<HTMLOptionElement>;


    optionChanged(options: NodeListOf<HTMLOptionElement>) {
        options.forEach((option) => {
            if (option.selected)
                this.iconsDiv.classList.add(option.value);
            else
                this.iconsDiv.classList.remove(option.value);
        })
    }

    render_svg(library: string, name: string) {
        if (library==="default")
            return html`<vx-svg name="${name}" ?button=${this.buttonMode}></vx-svg>`
        else
            return html`<vx-svg library="${library}" name="${name}" ?button=${this.buttonMode}></vx-svg>`
    }

    render_buttonClick(msg: string) {
        if (msg === "")
            return nothing;
        return html`<div>SVG clicked: ${msg}</div>`
    }

    render() {
        return html`
            <div>
                <span>
                    <label for="library">Library:</label>
                    <select id="library" @change=${(e: Event) => {
                        const lib = (e.target as HTMLSelectElement).value;
                        this.lib = (lib==="test") ? testIcons : defaultIcons;
                        this.libName = lib;
                    }}>
                        <option value="default" selected>Default icons</option>
                        <option value="test">Test icons</option>
                    </select>
                </span>
                
                <span>
                    <label for="size">Size:</label>
                    <select id="size" @change=${() => { this.optionChanged(this.sizeOptions) }}>
                        <option value="fontsize-1" selected>font-size: 2em</option>
                        <option value="fontsize-2">font-size: 4em</option>
                        <option value="fontsize-3">font-size: 8em</option>
                        <option value="size-1">width/height: 18px</option>
                        <option value="size-2">width/height: 36px</option>
                        <option value="size-3">width/height: 48px</option>
                    </select>
                </span>
                
                <span>
                    <label for="color">Color:</label>
                    <select id="color" @change=${() => { this.optionChanged(this.colorOptions) }}>
                        <option value="color-1" selected>Default color</option>
                        <option value="color-2">Red</option>
                        <option value="color-3">Green</option>
                        <option value="color-4">Blue</option>
                    </select>
                </span>
                
                <span>
                    <label for="buttonMode">Button Mode:</label>
                    <input type="checkbox" id="buttonMode" @change=${() => { 
                        this.buttonMode = !this.buttonMode;
                        this.buttonClicked = "";
                    }} />
                </span>                
            </div>
            
            <div id="icons" class="fontsize-1 color-1" @click=${(e:Event) => {
                if (e.target instanceof VxSvg) {
                    const target = e.target as VxSvg;
                    this.buttonClicked = `${target.library}.${target.name}`;
                }
             }}>
                ${Object.entries(this.lib).map(([t]) => 
                    this.render_svg(this.libName, t)
                )}
            </div>
            
            ${this.render_buttonClick(this.buttonClicked)}
       `
    }
}
