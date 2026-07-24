import type {
  WorkflowStep
} from "../step.interface";

import type {
  ExecutionContext
} from "../execution.context";

import type {
  Kernel
} from "../../kernel";



export class RiskStep
implements WorkflowStep {


  id =
    "risk-analysis";



  constructor(
    private kernel: Kernel
  ) {}



  async execute(
    context: ExecutionContext
  ) {


    return this.kernel.executeAgent(
      "risk-agent",
      context.data
    );


  }


}
