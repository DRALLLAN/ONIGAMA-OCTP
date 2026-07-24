import type { Agent } from "./agent.interface";
import type { AgentContext } from "./agent.context";
import type { AgentResult } from "./agent.result";


export abstract class BaseAgent
implements Agent {


  abstract id: string;

  abstract name: string;



  async execute(
    input: unknown
  ): Promise<AgentResult> {


    const context: AgentContext = {

      agentId: this.id,

      input

    };


    try {

      const result =
        await this.run(context);


      return {

        success: true,

        data: result

      };


    } catch(error) {


      return {

        success: false,

        error:
          error instanceof Error
          ? error.message
          : "Unknown error"

      };


    }


  }



  protected abstract run(
    context: AgentContext
  ): Promise<unknown>;


}
