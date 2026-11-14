import {LitElement, css, html} from 'lit'
import {customElement, state, queryAssignedElements, property} from "lit/decorators.js";
import {VxRoute} from "../vx-route/vx-route.component.ts";
import {composedPath} from "../../lib/dom.ts";

/**
 * A simple application router to render routes conditionally based on the current URL.
 * Each route is declared as a slotted `vx-route` element.
 * @see VxRoute
 */
@customElement('vx-router')
export class VxRouter extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
    `

    /**
     * Indicates that routes are matched in reverse order. When set, routes should be listed with
     * from least specific to most specific.
     */
    @property({type: Boolean}) reversed = false;

    @state() currentURL = new URL(window.location.href);
    @queryAssignedElements({selector: 'vx-route'}) routes!: Array<VxRoute>;

    constructor() {
        super();
        this.navigateEventHandler = this.navigateEventHandler.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        navigation.addEventListener('navigate', this.navigateEventHandler);
    }

    disconnectedCallback() {
        navigation.removeEventListener('navigate', this.navigateEventHandler)
        super.disconnectedCallback();
    }

    firstUpdated() {
        this.activateMatchingRoute();
    }

    navigateEventHandler(evt: NavigateEvent) {
        this.currentURL = new URL(evt.destination.url);
        if (evt.canIntercept) {
            evt.intercept();
            this.activateMatchingRoute();
        }
    }

    /**
     * Called by `navigateEventHandler()` to set/change the current route when a navigation event
     * occurs.
     */
    activateMatchingRoute() {
        // Check if this router is part of an active route or has no senior router
        const hasActiveParent = composedPath(this)
            .filter(node => node instanceof VxRoute)
            .map(node => node.active)
            .concat(true)[0]; // fallback for root element in case no parent routes

        // If closest parent route is not active, then flag all routes in this router to not active
        if (!hasActiveParent) {
            this.routes.forEach(route => {route.active = false});
            return;
        }

        // Determine the combined path of our parent routes
        const parentPath = composedPath(this)
            .filter(node => node instanceof VxRoute)
            .map(node => node.path)
            .reverse()
            .join("");

        // Determine the fragment of the pathname that is not part of our parent routes and needs to be matched
        let pathname = this.currentURL.pathname + (this.currentURL.hash || "");
        if (pathname.startsWith(parentPath)) // should always be true??
            pathname = pathname.substring(parentPath.length);

        // Check each child route and activate the first one that matches.  All other routes are deactivated.
        const routes = this.reversed ? this.routes.toReversed() : this.routes;
        let matched = false;
        for(const route of routes)
            if (matched)
                route.active = false;
            else
                matched = route.activateIfMatches(pathname);
    }

    render() {
        return html `<slot></slot>`
   }
}
