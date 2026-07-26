import type {
  Planner
} from "./planner.interface";

import type {
  PlanResult
} from "./plan.result";



export class OCTPPlanner
implements Planner {



  async createPlan(
    task: any
  ): Promise<PlanResult> {



    if (
      task.task ===
      "analyze-market"
    ) {


      return {


        type:
          "agent",


        target:
          "market-analysis",


        input:
          task


      };


    }





    if (
      task.task ===
      "trading"
    ) {


      return {


        type:
          "workflow",


        target:
          "trading-workflow",


        input:
          task


      };


    }





    throw new Error(
      `Unknown task ${task.task}`
    );


  }



}
