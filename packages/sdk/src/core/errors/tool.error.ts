import { OCTPError } from "./octp.error";

export class ToolNotFoundError
extends OCTPError {

  constructor(
    toolId: string
  ) {

    super(
      `Tool '${toolId}' not found`,
      "TOOL_NOT_FOUND"
    );

  }

}
