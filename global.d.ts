/* eslint-disable @typescript-eslint/no-explicit-any */
// global.d.ts
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (event: string, action: string) => void;
  }
}

export {};
