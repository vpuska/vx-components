/*
 * File: lib/svg-register.ts
 * Date: 15-Oct-26
 * Author: VJP
 */
import {nothing, type TemplateResult} from "lit";

/**
 * Object type mapping svg icon identifiers/keys to SVG template results.
 */
export type SVGLibrary = Record<string, TemplateResult>;

// SVG library register.
const register = new Map<string, SVGLibrary>();

/**
 * Registers a new {@link SVGLibrary} with the given name. The library is used to
 * store SVG icons that can be referenced by their identifiers/keys.
 * @param name The name of the library.
 * @param library The SVG library object.
 * @see {@link VxSvg}
 */
export function registerSvgLibrary(name: string, library: SVGLibrary ) {
    register.set(name, library);
}

/**
 * Returns the {@link SVGLibrary} with the given name.
 * @param name - The name of the SVG library.
 */
export function getSvgLibrary(name: string) {
    return register.get(name);
}

/**
 * Returns true if the SVG library with the given name exists.
 * @param name - The name of the SVG library.
 */
export function hasSvgLibrary(name: string) {
    return register.has(name);
}


/**
 * Returns the SVG template result for the given icon name.
 * @param name - The name of the icon in the format `library.icon`.  If library is not specified,
 * the default library is used.
 */
export function svg(name: string) : TemplateResult | typeof nothing {
    const nameParts = name.split('.');
    if (nameParts.length === 1)
        nameParts.unshift('default');
    if (nameParts.length === 2) {
        const [library, icon] = nameParts;
        if (hasSvgLibrary(library)) {
            const lib = getSvgLibrary(library)!;
            if (icon in lib)
                return lib[icon];
        }
    }
    return nothing;
}
