import { OCTPError } from "./octp.error";

export class KernelError
extends OCTPError {

  constructor(
    message: string,
    cause?: unknown
  ) {

    super(
      message,
      "KERNEL_ERROR",
      cause
    );

  }

}
