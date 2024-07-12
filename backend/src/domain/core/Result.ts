export default class Result<T> {
  private _isSuccess: boolean;
  private _data?: T | null;
  private _errors: string[];

  constructor(data: T | null, isSuccess: boolean, errors: string[]) {
    if (!isSuccess && errors === null) {
        throw new Error('Invalid Operation');
    }

    this._data = data;
    this._isSuccess = isSuccess;
    this._errors = errors;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get isSuccess(): boolean {
      return this._isSuccess;
  }

  getErrors(): string[] {
      return this._errors;
  }

  getData(): T | null {
    return this._data as T | null;
  }

  static failure<T>(errors: string[]): Result<T> {
    return new Result<T>(null, false, errors);
  }

  static success<T>(data: T): Result<T> {
    return new Result(data, true, []);
  }
}