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

  unregisterAgent(agentId: string): boolean;

  registerWorkflow(workflow: Workflow): void;

  unregisterWorkflow(workflowId: string): boolean;

  registerTool(tool: Tool): void;

  unregisterTool(toolId: string): boolean;

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
