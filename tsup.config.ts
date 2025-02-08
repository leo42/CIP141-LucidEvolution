import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "lib",
  platform: 'browser',
  esbuildOptions(options) {
    options.bundle = true
    options.platform = 'browser'
    options.inject = ['./src/polyfills.ts']
  },
  external: [
    "@anastasia-labs/cardano-multiplatform-lib-nodejs",
    "@lucid-evolution/core-types",
    "@lucid-evolution/core-utils",
    "@lucid-evolution/utils",
    "@utxorpc/sdk",
    "@utxorpc/spec"
  ],
  noExternal: ["events"]
});