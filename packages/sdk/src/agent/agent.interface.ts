import type { AgentResult } from "./agent.result";


export interface Agent {

  id: string;

  name: string;


  execute(
    input: unknown
  ): Promise<AgentResult>;

}
