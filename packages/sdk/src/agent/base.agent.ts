import type { Agent } from "./agent.interface";
import type { AgentContext } from "./agent.context";
import type { AgentResult } from "./agent.result";
import type { ExecutableAgent } from "./executable-agent.interface";


export abstract class BaseAgent
implements Agent, ExecutableAgent {


  abstract id: string;

  abstract name: string;



  async execute(
    input: unknown
  ): Promise<AgentResult> {

    return this.run(input);

  }



  abstract run(
    input: unknown,
    context?: AgentContext
  ): Promise<AgentResult>;


}
