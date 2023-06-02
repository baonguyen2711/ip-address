declare module 'leaflet' {
    export function map(id: string, options?: any): any;
    export function tileLayer(urlTemplate: string, options?: any): any;
    export function marker(latlng: [number, number], options?: any): any;
  }