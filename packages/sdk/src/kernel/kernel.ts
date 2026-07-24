import type { IKernel } from "./kernel.interface";

export class Kernel implements IKernel {

  private agents = new Map();

  private workflows = new Map();

  private tools = new Map();


  registerAgent(agent: any): void {
    this.agents.set(agent.id, agent);
  }


  registerWorkflow(workflow: any): void {
    this.workflows.set(workflow.id, workflow);
  }


  registerTool(tool: any): void {
    this.tools.set(tool.id, tool);
  }


  async execute(
    workflowId: string,
    input: unknown
  ): Promise<unknown> {

    const workflow = this.workflows.get(workflowId);

    if (!workflow) {
      throw new Error(
        `Workflow ${workflowId} not found`
      );
    }


    return workflow.execute(input);

  }

}
