import type {
  Agent
} from "../agent";

import type {
  ExecutableAgent
} from "../agent";

import {
  AgentRegistry,
  WorkflowRegistry,
  ToolRegistry
} from "./registry";

import type {
  Workflow
} from "../workflow";

import type {
  Tool
} from "../mcp";

import type {
  IKernel
} from "./kernel.interface";



export class Kernel
implements IKernel {



  private agents =
    new AgentRegistry();


  private workflows =
    new WorkflowRegistry();


  private tools =
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




  getAgent(
    agentId: string
  ): ExecutableAgent | undefined {


    return this.agents.get(
      agentId
    ) as ExecutableAgent | undefined;


  }




   async executeAgent(
  agentId: string,
  input: unknown
) {


  const agent =
    this.getAgent(agentId);



  if (!agent) {

    throw new Error(
      `Agent ${agentId} not found`
    );

  }



  return agent.run(
    input,
    {
      kernel: this
    } as any
  );


}




  async execute(
    workflowId: string,
    input: unknown
  ): Promise<unknown> {


    const workflow =
      this.workflows.get(
        workflowId
      );



    if (!workflow) {

      throw new Error(
        `Workflow ${workflowId} not found`
      );

    }



    return workflow.execute(
      input
    );


  }




async executeTool(
  toolId: string,
  input: unknown
): Promise<unknown> {


  const tool =
    this.tools.get(toolId);



  if (!tool) {

    throw new Error(
      `Tool ${toolId} not found`
    );

  }



  return tool.execute(
    input
  );


}


}
