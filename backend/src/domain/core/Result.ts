export default class Result<T> {
  private _isSuccess: boolean;
  private _data?: T | undefined;
  private _errors?: string[] | undefined;

  constructor(isSuccess: boolean, data: T | undefined, errors: string[] | undefined) {
    if (!isSuccess && errors === null) {
        throw new Error("Invalid Operation");
    }

    this._data = data;
    this._isSuccess = isSuccess;
    this._errors = errors;

    Object.freeze(this);
  }

  get errors(): string[] | undefined {
    return this._errors;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get isSuccess(): boolean {
      return this._isSuccess;
  }

  get data(): T | null {
    return this._data as T | null;
  }

  static failure<T>(errors: string[]): Result<T> {
    return new Result<T>(false, undefined, errors);
  }

  static success<T>(data: T): Result<T> {
    return new Result(true, data, undefined);
  }

  toJSON() {
    return {
      data: this._data,
      errors: this._errors
    };
  }
}
