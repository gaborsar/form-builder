import { type ErrorMessageMap, localizeMessage } from "./IntlUtils";

export interface ValidationErrorDetails {
  [key: string]: unknown;
}

export interface ValidationError {
  type: keyof ErrorMessageMap;
  details: ValidationErrorDetails;
  message: string;
}

export class ValidationErrorFactory {
  private _locale: string;
  private _errorMessages: ErrorMessageMap;

  constructor(locale: string, errorMessages: ErrorMessageMap) {
    this._locale = locale;
    this._errorMessages = errorMessages;
  }

  wrapWithError<Result extends { isValid: boolean; errors?: ValidationError[] }>(
    result: Result,
    type: keyof ErrorMessageMap,
    details: ValidationErrorDetails = {},
  ): Result {
    const { errors = [] } = result;
    const error = this.crateError(type, details);
    return { ...result, isValid: false, errors: errors.concat(error) };
  }

  private crateError(
    type: keyof ErrorMessageMap,
    details: ValidationErrorDetails = {},
  ): ValidationError {
    const { [type]: descriptor = {} } = this._errorMessages;
    return {
      type,
      details,
      message: localizeMessage(descriptor, this._locale, details),
    };
  }
}
