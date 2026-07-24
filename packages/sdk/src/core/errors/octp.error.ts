export class OCTPError extends Error {

  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown
  ) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace?.(
      this,
      this.constructor
    );
  }

}
