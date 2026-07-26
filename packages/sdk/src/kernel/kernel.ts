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

import {
  InMemoryEventBus
} from "../core/events";

import type {
  IEventBus
} from "../core/events";

import {
  OCTP_EVENTS
} from "../core/events";



export class Kernel
implements IKernel {



  private agents =
    new AgentRegistry();


  private workflows =
    new WorkflowRegistry();


  private tools =
    new ToolRegistry();


  private eventBus: IEventBus;


  constructor(
    eventBus?: IEventBus
  ) {

    this.eventBus =
      eventBus ?? new InMemoryEventBus();

  }




  getEventBus(): IEventBus {

    return this.eventBus;

  }




  registerAgent(
    agent: Agent
  ): void {

    this.agents.register(agent);

    void this.eventBus.emit(
      OCTP_EVENTS.AGENT_REGISTERED,
      { agentId: agent.id }
    );

  }




  unregisterAgent(
    agentId: string
  ): boolean {

    const removed =
      this.agents.unregister(agentId);

    if (removed) {

      void this.eventBus.emit(
        OCTP_EVENTS.AGENT_UNREGISTERED,
        { agentId }
      );

    }

    return removed;

  }




  registerWorkflow(
    workflow: Workflow
  ): void {

    this.workflows.register(workflow);

    void this.eventBus.emit(
      OCTP_EVENTS.WORKFLOW_REGISTERED,
      { workflowId: workflow.id }
    );

  }




  unregisterWorkflow(
    workflowId: string
  ): boolean {

    const removed =
      this.workflows.unregister(workflowId);

    if (removed) {

      void this.eventBus.emit(
        OCTP_EVENTS.WORKFLOW_UNREGISTERED,
        { workflowId }
      );

    }

    return removed;

  }




  registerTool(
    tool: Tool
  ): void {

    this.tools.register(tool);

    void this.eventBus.emit(
      OCTP_EVENTS.TOOL_REGISTERED,
      { toolId: tool.id }
    );

  }




  unregisterTool(
    toolId: string
  ): boolean {

    const removed =
      this.tools.unregister(toolId);

    if (removed) {

      void this.eventBus.emit(
        OCTP_EVENTS.TOOL_UNREGISTERED,
        { toolId }
      );

    }

    return removed;

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



  try {

    const result =
      await agent.run(
        input,
        {
          kernel: this
        } as any
      );

    await this.eventBus.emit(
      OCTP_EVENTS.AGENT_EXECUTED,
      { agentId, input, result }
    );

    return result;

  } catch (cause) {

    await this.eventBus.emit(
      OCTP_EVENTS.AGENT_EXECUTION_FAILED,
      { agentId, input, cause }
    );

    throw cause;

  }


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



    try {

      const result =
        await workflow.execute(
          input
        );

      await this.eventBus.emit(
        OCTP_EVENTS.WORKFLOW_EXECUTED,
        { workflowId, input, result }
      );

      return result;

    } catch (cause) {

      await this.eventBus.emit(
        OCTP_EVENTS.WORKFLOW_EXECUTION_FAILED,
        { workflowId, input, cause }
      );

      throw cause;

    }


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



  try {

    const result =
      await tool.execute(
        input
      );

    await this.eventBus.emit(
      OCTP_EVENTS.TOOL_EXECUTED,
      { toolId, input, result }
    );

    return result;

  } catch (cause) {

    await this.eventBus.emit(
      OCTP_EVENTS.TOOL_EXECUTION_FAILED,
      { toolId, input, cause }
    );

    throw cause;

  }


}


}
