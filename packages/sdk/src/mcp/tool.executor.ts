import type { Tool } from "./tool.interface";
import { ToolRuntime } from "./tool.runtime";


export class ToolExecutor {


  private runtime =
    new ToolRuntime();



  async run(
    tool: Tool,
    input: unknown
  ): Promise<unknown> {


    return this.runtime.execute(
      tool,
      input
    );

  }


}
