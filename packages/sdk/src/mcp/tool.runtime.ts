import type { Tool } from "./tool.interface";


export class ToolRuntime {


  async execute(
    tool: Tool,
    input: unknown
  ): Promise<unknown> {


    return tool.execute(
      input
    );


  }

}
