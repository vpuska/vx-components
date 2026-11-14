import {LitElement, css, html, nothing, type TemplateResult, type PropertyValues} from 'lit'
import {customElement, property} from "lit/decorators.js";
import {createRef, ref} from "lit/directives/ref.js";
import {match} from "path-to-regexp";

/**
 * A route is a container for a set of content that is displayed when a specific URL fragment is
 * matched by the parent `vx-router` element.
 * <br><a href="https://vpuska.github.io/vx-docs/Components/vx-route/">Documentation</a>
 * @see VxRouter
 */
@customElement('vx-route')
export class VxRoute extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
        :host {
            display: block;
        }
    `

    /**
     * The URL path of this route.
     */
    @property() path: string = "";

    /**
     * Indicates whether this route is a subroute of another route.  When the path is a subroute,
     * a match is made when the path is a prefix of the URL.  For example, if the path is `/customers`,
     * this will match `/customers` and `/customers/123`.  The subroute is expected to handle
     * the remaining URL fragment.
     * Defaults to false.
     */
    @property({type: Boolean}) subroute = false;

    /**
     * Indicates whether the item is currently active.
     * This property is updated by the parent {@link VxRouter} element.
     * Defaults to false.
     */
    @property({type: Boolean}) active = false;

    /**
     * Optional component element tag.  When specified, any slotted content will be ignored.  The component
     * will be created and attached to the DOM.
     */
    @property() component: string | undefined;

    /**
     * The HTML content to be rendered when this route is active. This can be {@link TemplateResult}
     * or function returning a {@link TemplateResult}<br>
     * Default is `<slot></slot>`.
     */
    public customTemplate: TemplateResult | (() => TemplateResult) = html`<slot></slot>`;

    /**
     * Reference to the optional {@link component} element.  This reference is set after the route is
     * activated and destroyed when the route is deactivated.
     */
    public componentRef : HTMLElement | undefined;

    /**
     * Parameters extracted from the URL when the route is activated.
     */
    public parameters: Partial<Record<string, string | string[]>> = {};

    // Reference to the container element where the {@link component} will be attached.
    private containerRef = createRef();

    /**
     * Activate the route the route's path matches the URL.  Returns true if the route is activated, false otherwise.
     * @param url The URL to match against the route's path.  This URL is expected to be a full URL, including the
     * protocol, host, and port.  The URL is matched against the route's path using the same syntax as
     * the `path-to-regexp` library.
     */
    public activateIfMatches(url: string) : boolean {
        try {
            const fn = match(this.path, {end: !this.subroute});
            const result = fn(url);
            if (result) {
                this.parameters = result.params;
                this.active = true;
                return true;
            }
        }
        catch (e) {
            console.error("Error matching path", this.path);
            console.error(e);
        }
        this.parameters = {};
        this.active = false;
        return false;
    }

    private newEvent(name: string) {
        return new CustomEvent(name, {
            bubbles: true,
            composed: true,
            detail: {},
        });
    }

    public connectedCallback() {
        super.connectedCallback();
        this.dispatchEvent(this.newEvent('vx-connected'));
    }

    protected willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('active')) {
            const active = changedProperties.get('active') || false;
            if (active !== this.active) {
                const event = this.active ? 'vx-activate' : 'vx-deactivate';
                this.dispatchEvent(this.newEvent(event));
            }
        }
    }

    protected updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('active')) {
            const active = changedProperties.get('active') || false;
            if (active !== this.active) {
                const event = this.active ? 'vx-activated' : 'vx-deactivated';
                this.dispatchEvent(this.newEvent(event));
            }
        }
        // Create component if active, we have a component property, and it is not yet created.
        if (this.active && this.component) {
            if (!this.componentRef) // do we need to create the component?
                this.componentRef = document.createElement(this.component);
            if (this.componentRef) // attach to DOM if it is successfully created
                this.containerRef.value?.appendChild(this.componentRef);
        }
        // Discard component if route inactive and it is already created.
        if (!this.active && this.componentRef) {
            this.componentRef?.remove();
            this.componentRef = undefined;
        }
        // Discard parameters if not active
        this.parameters = {};
    }

    private renderTemplate(content: TemplateResult | (() => TemplateResult)) {
        return ( typeof content === 'function' ) ? content() : content;
    }

    render() {
        let content = this.customTemplate;
        if (this.component)
            content = html`<div id="container" ${ref(this.containerRef)}></div>`;
        return this.active ? this.renderTemplate(content) : nothing;
    }
}
