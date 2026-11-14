import {LitElement, css, html,} from 'lit'
import {customElement} from "lit/decorators.js";

import "../../components/vx-router/vx-router.ts";
import "../../components/vx-route/vx-route.ts";
import VxRoute from "../../components/vx-route/vx-route.ts";


@customElement('t-routing')
export class TestRouting extends LitElement {

    // noinspection CssUnusedSymbol
    static styles = css`
    `

    render() {
        return html`
            <vx-router id="test">
                <vx-route path="/">
                    <h2>Router Test index page</h2>
                    <ul>
                        <li><a href="./home">Home Page</a></li>
                        <li><a href="./home/dummy">Home Page with splat</a></li>
                        <li><a href="./button">Button Page</a></li>
                        <li><a href="./rendered">Custom Render</a></li>
                        <li><a href="./help">Help Page</a></li>
                        <li><a href="./about">About Page</a></li>
                        <li><a href="./dummy">This will go to the default page</a></li>
                        <li><a href="/">Return to test suite menu</a></li>
                    </ul>
                </vx-route>
                <vx-route path="/home/:dummy">
                    <h2>Home page with a parameter</h2>
                    <a href="./..">Return to index page</a>
                </vx-route>
                <vx-route path="/home/">
                    <h2>Home page with splat</h2>
                    <a href="./">Return to index page</a>
                </vx-route>
                <vx-route path="/rendered"
                          @vx-connected=${(e: CustomEvent) => {
                              const target = e.target as VxRoute;
                              let entries = 0;
                              let fn = () => {
                                  entries++;
                                  return entries;
                              }
                              target.customTemplate = () => html`
                                  <h2>Render function set in <code>vx-connected</code> event handler</h2>
                                  <p>
                                      This content has been rendered ${fn()} times
                                  </p>
                                  <p style="max-width: 50em;">
                                      The content should be created once, when the route is added to the DOM, like
                                      slotted elements.
                                      However, because it is rendered as part of an event handler; local, persistent
                                      variables can be
                                      created for route's content.
                                  </p><p style="max-width: 50em;">
                                      This causes the following behavior on entry to the route:
                                  <ul>
                                      <li>The button click count is reset to zero.</li>
                                      <li>The render count, which has greater scope, is incremented each time the route
                                          is entered.
                                      </li>
                                  </ul>
                                  </p>
                                  <button data-count="0" @click=${(e: MouseEvent) => {
                                      const target = e.target as HTMLElement;
                                      const count = parseInt(target.getAttribute('data-count') || '0') + 1;
                                      target.setAttribute('data-count', count.toString());
                                      target.innerText = "Clicked " + count + " times";
                                  }}
                                  >Not clicked
                                  </button>
                                  <p><a href="./">Return to Index Page</a></p>
                              `
                          }}
                >
                    This should not be rendered
                </vx-route>
                <vx-route path="/button">
                    <h2>Button Page</h2>
                    <div>
                        <p style="max-width: 50em;">
                            This page demonstrates to lifespan of elements rendered in a the route's
                            <code><b>slot</b></code>.
                            If you exit the route, the button element still exists in the DOM, and when you re-enter,
                            the
                            count will not reset to zero.
                        </p>
                        <p style="max-width: 50em;">
                            Using the browser's URL field to re-enter the route will re-load the page/app and
                            reset the button (ie re-render the route) unless the route is a hash (#).
                            However, navigating back/forward will not reset the button.
                        </p>
                        <button data-count="0" @click=${(e: MouseEvent) => {
                            const target = e.target as HTMLElement;
                            const count = parseInt(target.getAttribute('data-count') || '0') + 1;
                            target.setAttribute('data-count', count.toString());
                            target.innerText = "Clicked " + count + " times";
                        }}
                        >Not clicked
                        </button>
                        <p><a href="./">Return to Index Page</a></p>
                    </div>
                </vx-route>
                <vx-route path="/help">
                    <h2>Help and confused page</h2>
                    <a href="./about">Go to the ABOUT page</a>
                </vx-route>
                <vx-route path="/about">
                    <h2>About page</h2>
                    <a href="./">Return to Index Page</a>
                </vx-route>
                <vx-route path="/*splat">
                    <h2>This is the fallback route</h2>
                    <a href="./">Return to Index Page</a>
                </vx-route>
            </vx-router>
        `}
}
