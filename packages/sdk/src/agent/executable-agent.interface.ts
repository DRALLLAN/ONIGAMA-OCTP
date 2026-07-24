import type { AgentResult } from "./agent.result";
import type { AgentContext } from "./agent.context";


export interface ExecutableAgent {

  run(
    input: unknown,
    context?: AgentContext
  ): Promise<AgentResult>;

}
