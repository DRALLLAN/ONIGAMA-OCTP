import type { Agent } from "../agent/agent.interface";
import type { Workflow } from "../workflow/workflow.interface";
import type { Tool } from "../mcp/tool.interface";

export interface IKernel {

  registerAgent(agent: Agent): void;

  registerWorkflow(workflow: Workflow): void;

  registerTool(tool: Tool): void;

  execute(
    workflowId: string,
    input: unknown
  ): Promise<unknown>;

}
