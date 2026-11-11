import {VxPanel} from "./vx-panel.component.ts";

//noinspection JSUnusedGlobalSymbols
export default VxPanel;

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface HTMLElementTagNameMap {
        'vx-panel': VxPanel;
    }
}
