import { OCTPError } from "./octp.error";

export class PlannerError
extends OCTPError {

  constructor(
    message: string,
    cause?: unknown
  ) {

    super(
      message,
      "PLANNER_ERROR",
      cause
    );

  }

}
