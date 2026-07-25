import type {
  ExecutableAgent
} from "../agent";
import type { Agent } from "../agent/agent.interface";
import type { Workflow } from "../workflow/workflow.interface";
import type { Tool } from "../mcp/tool.interface";
import type { IEventBus } from "../core/events";

export interface IKernel {

  getEventBus(): IEventBus;

  registerAgent(agent: Agent): void;

  registerWorkflow(workflow: Workflow): void;

  registerTool(tool: Tool): void;

  execute(
    workflowId: string,
    input: unknown
  ): Promise<unknown>;

executeAgent(
  agentId: string,
  input: unknown
): Promise<unknown>;

getAgent(
  agentId: string
): ExecutableAgent | undefined;

executeTool(
  toolId: string,
  input: unknown
): Promise<unknown>;
}
