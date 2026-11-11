import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";

export default {
  globs: ["src/components/**/*.ts"],
  exclude: ["src/tests/**/*", "src/**/*.test.ts", "src/**/*.spec.ts"],
  plugins: [
    customElementJetBrainsPlugin({
      outdir: "./",
      webTypesFileName: "vx-webtypes.json",
    }),
  ],
};
