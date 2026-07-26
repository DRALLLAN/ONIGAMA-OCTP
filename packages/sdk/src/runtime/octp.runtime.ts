import {
  Kernel
} from "../kernel";


import {
  MarketAnalysisAgent,
  RiskAgent
} from "../agent";


import {
  MarketDataTool
} from "../mcp";


import {
  TradingWorkflow,
  WorkflowEngine
} from "../workflow";


import {
  OCTPPlanner
} from "../planner";


import {
  ServiceContainer,
  TOKENS
} from "../core/container";


import {
  buildOCTPContainer
} from "./container.factory";



export class OCTPRuntime {



  readonly kernel: Kernel;


  private container: ServiceContainer;


  private workflowEngine:
    WorkflowEngine;


  private planner:
    OCTPPlanner;


  private workflows =
    new Map<string, unknown>();



  constructor(
    container: ServiceContainer = buildOCTPContainer()
  ) {

    this.container = container;

    this.kernel =
      container.resolve<Kernel>(
        TOKENS.KERNEL
      );

    this.planner =
      container.resolve<OCTPPlanner>(
        TOKENS.PLANNER
      );

    this.workflowEngine =
      new WorkflowEngine();


    this.registerTools();

    this.registerAgents();

    this.registerWorkflows();


  }



  getContainer(): ServiceContainer {

    return this.container;

  }



  private registerTools() {


    this.kernel.registerTool(
      new MarketDataTool()
    );


  }



  private registerAgents() {


    this.kernel.registerAgent(
      new MarketAnalysisAgent()
    );


    this.kernel.registerAgent(
      new RiskAgent()
    );


  }



  private registerWorkflows() {


    const tradingWorkflow =
      new TradingWorkflow(
        this.kernel
      );


    this.workflows.set(
      "trading-workflow",
      tradingWorkflow
    );


  }



  async executeAgent(
    agentId: string,
    input: unknown
  ): Promise<unknown> {


    return this.kernel.executeAgent(
      agentId,
      input
    );


  }



  async executeWorkflow(
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



    return this.workflowEngine.execute(
      workflow as any,
      input
    );


  }



  async runTask(
    task: any
  ): Promise<unknown> {



    const plan =
      await this.planner.createPlan(
        task
      );



    if (
      plan.type === "agent"
    ) {


      return this.executeAgent(
        plan.target,
        plan.input
      );


    }



    if (
      plan.type === "workflow"
    ) {


      return this.executeWorkflow(
        plan.target,
        plan.input
      );


    }



    throw new Error(
      "Invalid execution plan"
    );


  }



}
