import { isArray, isBoolean, isNumber, isObject, isString } from "./TypeUtils";

interface TemplateScope {
  ISTEXT: typeof ISTEXT;
  ISNUMBER: typeof ISNUMBER;
  ISLOGICAL: typeof ISLOGICAL;
  ISOBJECT: typeof ISOBJECT;
  ISLIST: typeof ISLIST;
  LENGTH: typeof LENGTH;
  IF: typeof IF;
  AND: typeof AND;
  OR: typeof OR;
  NOT: typeof NOT;
  EQ: typeof EQ;
  INCLUDES: typeof INCLUDES;
  LT: typeof LT;
  GT: typeof GT;
  LTE: typeof LTE;
  GTE: typeof GTE;
  ROUND: typeof ROUND;
  FLOOR: typeof ROUND;
  CEILING: typeof CEILING;
  MOD: typeof MOD;
  POWER: typeof POWER;
  SQRT: typeof SQRT;
}

const scope: TemplateScope = {
  ISTEXT,
  ISNUMBER,
  ISLOGICAL,
  ISOBJECT,
  ISLIST,
  LENGTH,
  IF,
  AND,
  OR,
  NOT,
  EQ,
  INCLUDES,
  LT,
  GT,
  LTE,
  GTE,
  ROUND,
  FLOOR,
  CEILING,
  MOD,
  POWER,
  SQRT,
};

export function safeEval(template: string): unknown {
  const fn = new Function(
    "scope",
    `"use strict";
    const {
      ISTEXT,
      ISNUMBER,
      ISLOGICAL,
	  ISOBJECT,
	  ISLIST,
	  LENGTH,
      IF,
      AND,
      OR,
      NOT,
      EQ,
      INCLUDES,
      LT,
      GT,
      LTE,
      GTE,
      ROUND,
      FLOOR,
      CEILING,
      MOD,
      POWER,
      SQRT
    } = scope;
    return ${template};`,
  );
  return fn(scope);
}

function ISTEXT(value: unknown): boolean {
  return isString(value);
}

function ISNUMBER(value: unknown): boolean {
  return isNumber(value);
}

function ISLOGICAL(value: unknown): boolean {
  return isBoolean(value);
}

function ISOBJECT(value: unknown): boolean {
  return isObject(value);
}

function ISLIST(value: unknown): boolean {
  return isArray(value);
}

function LENGTH(value: unknown): number {
  return isArray(value) || isString(value) ? value.length : Number.NaN;
}

function IF(condition: unknown, thenValue: unknown, elseValue: unknown = undefined): unknown {
  return condition === true ? thenValue : elseValue;
}

function AND(...conditions: unknown[]): boolean {
  return conditions.every((item) => item === true);
}

function OR(...conditions: unknown[]): boolean {
  return conditions.some((item) => item === true);
}

function NOT(condition: unknown): boolean {
  return condition !== true;
}

function EQ(value1: unknown, value2: unknown): boolean {
  return value1 === value2;
}

function INCLUDES(values: unknown, value: unknown): boolean {
  return Array.isArray(values) && values.includes(value);
}

function LT(value1: unknown, value2: unknown): boolean {
  return isNumber(value1) && isNumber(value2) && value1 < value2;
}

function GT(value1: unknown, value2: unknown): boolean {
  return isNumber(value1) && isNumber(value2) && value1 > value2;
}

function LTE(value1: unknown, value2: unknown): boolean {
  return isNumber(value1) && isNumber(value2) && value1 <= value2;
}

function GTE(value1: unknown, value2: unknown): boolean {
  return isNumber(value1) && isNumber(value2) && value1 >= value2;
}

function ROUND(value: unknown, precision?: number): number {
  if (!isNumber(value)) {
    return Number.NaN;
  }
  return precision === undefined ? Math.round(value) : Number.parseFloat(value.toFixed(precision));
}

function FLOOR(value: unknown): number {
  if (!isNumber(value)) {
    return Number.NaN;
  }
  return Math.floor(value);
}

function CEILING(value: unknown): number {
  if (!isNumber(value)) {
    return Number.NaN;
  }
  return Math.ceil(value);
}

function MOD(dividend: unknown, divisor: unknown): number {
  if (!isNumber(dividend) || !isNumber(divisor)) {
    return Number.NaN;
  }
  return dividend % divisor;
}

function POWER(base: unknown, exponent: number): number {
  if (!isNumber(base) || !isNumber(exponent)) {
    return Number.NaN;
  }
  return base ** exponent;
}

function SQRT(value: unknown): number {
  if (!isNumber(value)) {
    return Number.NaN;
  }
  return Math.sqrt(value);
}
