/*
 * lib/theming.ts
 * --------------
 * author VJP
 * written 15-Oct-26
 */


import type {CSSResult} from "lit";

type StyleFunction = (params: Object) => CSSResult;

export default class VxThemeManager {

    static functions = new Map<string, StyleFunction>;

    /**
     * Initialise Theme module and load preferred theme.
     */
    static init() {
        VxThemeManager.loadTheme();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            VxThemeManager.loadTheme();
        });

        window.addEventListener('storage', (event: StorageEvent) => {
            if (event.key === 'theme' || event.key === 'themeColor')
                VxThemeManager.loadTheme();
        })
    }


    /**
     * Load the current theme (light/dark) and theme color based on saved preference or system settings.
     */
    static loadTheme() {
        const root = document.documentElement;

        let preferredTheme = (localStorage.getItem("vx-theme") || "system");

        if (preferredTheme === "system")
            preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

        if (preferredTheme === "dark") {
            root.classList.add("vx-theme-dark");
            root.classList.remove("vx-theme-light");
        } else {
            root.classList.add("vx-theme-light");
            root.classList.remove("vx-theme-dark");
        }
    }

    static registerFunction(name: string, func: StyleFunction) {
        VxThemeManager.functions.set(name, func);
    }

    static getFunction(name: string) {
        return VxThemeManager.functions.get(name);
    }
}


VxThemeManager.init();

