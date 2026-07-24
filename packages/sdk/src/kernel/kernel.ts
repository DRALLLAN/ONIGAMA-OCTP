import type { IKernel } from "./kernel.interface";

import { AgentRegistry } from "./registry/agent.registry";
import { WorkflowRegistry } from "./registry/workflow.registry";
import { ToolRegistry } from "./registry/tool.registry";

import type { Agent } from "../agent";
import type { Workflow } from "../workflow";
import type { Tool } from "../mcp";


export class Kernel implements IKernel {


  private readonly agents =
    new AgentRegistry();


  private readonly workflows =
    new WorkflowRegistry();


  private readonly tools =
    new ToolRegistry();



  registerAgent(
    agent: Agent
  ): void {

    this.agents.register(agent);

  }



  registerWorkflow(
    workflow: Workflow
  ): void {

    this.workflows.register(workflow);

  }



  registerTool(
    tool: Tool
  ): void {

    this.tools.register(tool);

  }



  async execute(
    workflowId: string,
    input: unknown
  ): Promise<unknown> {


    const workflow =
      this.workflows.get(workflowId);



    if (!workflow) {

      throw new Error(
        `Workflow ${workflowId} not found`
      );

    }



    return workflow.execute(input);

  }

}
