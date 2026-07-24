import type {
  WorkflowStep
} from "../step.interface";

import type {
  ExecutionContext
} from "../execution.context";

import type {
  Kernel
} from "../../kernel";



export class MarketStep
implements WorkflowStep {


  id =
    "market-analysis";



  constructor(
    private kernel: Kernel
  ) {}



  async execute(
    context: ExecutionContext
  ) {


    return this.kernel.executeAgent(
      "market-analysis",
      context.data
    );


  }


}
