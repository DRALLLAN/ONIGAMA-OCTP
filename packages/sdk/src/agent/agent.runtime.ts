import {
  MemoryStore,
  MemoryRuntime,
  RedisMemoryStore
} from "../memory";

import type {
  Agent
} from "./agent.interface";


import type {
  AgentResult
} from "./agent.result";


import type {
  AgentContext
} from "./agent.context";


import {
  MemoryStore,
  MemoryRuntime
} from "../memory";



export class AgentRuntime {



private memoryRuntime =
  new MemoryRuntime(
    process.env.NODE_ENV === "production"
      ? new RedisMemoryStore()
      : new MemoryStore()
  );





  async run(
    agent: Agent,
    input: unknown
  ): Promise<AgentResult> {



    const context: AgentContext = {


      agentId:
        agent.id,



      input,



      memory:
        this.memoryRuntime,



      metadata: {


        agentName:
          agent.name


      }


    };





    return agent.execute(
      context
    );



  }



}
