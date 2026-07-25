import type {
  WorkflowStep
} from "../step.interface";

import type {
  ExecutionContext
} from "../execution.context";



export class DecisionStep
implements WorkflowStep {


  id =
    "trade-decision";



  async execute(
    context: ExecutionContext
  ) {


    const market =
      context.data[
        "market-analysis"
      ];


    const risk =
      context.data[
        "risk-analysis"
      ];



    return {


      action:
        "READY",


      market,

      risk


    };


  }


}
