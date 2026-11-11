import {VxSvg} from "./vx-svg.component.ts";

//noinspection JSUnusedGlobalSymbols
export default VxSvg;

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface HTMLElementTagNameMap {
        'vx-svg': VxSvg;
    }
}
