import {LitElement, html, nothing, type TemplateResult, css,} from 'lit'
import {customElement} from "lit/decorators.js";
import "../../components/vx-panel/vx-panel.ts";

@customElement('t-panels')
export class TestPanels extends LitElement {

    static styles = css`
        h3 {
            margin: 0;
        }
    `

    renderPanel(level: number) : TemplateResult | typeof nothing {
        if (level > 6)
            return nothing;
        return html`
            <vx-panel level=${level}>
                <h3 slot="header">
                    Level ${level}
                </h3>
                This is the test panel level ${level}
                lorem ipsum dolor sit amet consectetur adipiscing elit non cumque 
                enim dolores deleniti sed ad lorem soluta vero possimus omnis veniam 
                laborum et consectetur placeat ex id proident sint et imperdiet soluta 
                id in dolor enim excepteur id nostrud tempore expedita anim voluptate 
                ipsum voluptas sunt incididunt sint id vel
                ${this.renderPanel(level + 1)}
                <span slot="footer">
                    This is the footing
                </span>
            </vx-panel>
        `
    }

    render() {
        return html`
            ${this.renderPanel(0)}
        `
    }
}


