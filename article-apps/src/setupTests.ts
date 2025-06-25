import "@testing-library/jest-dom";

import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;

// @ts-expect-error: Custom polyfill for Node environment
global.TextDecoder = class {
  decode(input: ArrayBuffer | Uint8Array): string {
    return Buffer.from(input).toString("utf8");
  }
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});
