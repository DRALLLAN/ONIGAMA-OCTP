import { OCTPError } from "./octp.error";

export class AgentExecutionError
extends OCTPError {

  constructor(
    agentId: string,
    cause?: unknown
  ) {

    super(
      `Agent '${agentId}' execution failed`,
      "AGENT_EXECUTION_ERROR",
      cause
    );

  }

}
