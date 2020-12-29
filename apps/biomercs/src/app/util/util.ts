import { isString } from '@stlmpp/utils';

export type CompareFn<T = any> = (valueA: T, valueB: T) => boolean;
export const compareByFactory = <T = any>(key: keyof T): CompareFn<T> => (valueA, valueB) =>
  valueA?.[key] === valueB?.[key];

export function convertToBoolProperty(val: any): boolean {
  if (isString(val)) {
    val = val.toLowerCase().trim();
    return val === 'true' || val === '';
  }
  return !!val;
}

export interface SimpleChangeCustom<T = any> {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;
  isFirstChange(): boolean;
}
export type SimpleChangesCustom<T extends Record<any, any> = any> = { [K in keyof T]?: SimpleChangeCustom<T[K]> };

export function rotateArray<T>(array: T[], rotations: number): T[] {
  return array.slice(rotations, array.length).concat(array.slice(0, rotations));
}
