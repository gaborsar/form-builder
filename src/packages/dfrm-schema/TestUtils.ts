import type { ValidationError } from "./ValidationUtils";

interface ResultWithPotentialError {
  isValid: boolean;
  errors?: ValidationError[];
}

export function expectNoError(result: ResultWithPotentialError) {
  expect(result.isValid).toBe(true);
  expect(result).not.toHaveProperty("errors");
}

export function expectError(result: ResultWithPotentialError, error: ValidationError) {
  expect(result.isValid).toBe(false);
  expect(result.errors).toContainEqual(error);
}

export function expectValue(result: { value: unknown }, value: unknown) {
  expect(result.value).toEqual(value);
}
