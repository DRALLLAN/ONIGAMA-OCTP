import type { Planner } from "./planner.interface";
import type { PlanResult } from "./plan.result";


export class PlannerRuntime {


  constructor(
    private planner: Planner
  ) {}



  async create(
    input: unknown
  ): Promise<PlanResult> {


    return this.planner.createPlan(
      input
    );


  }

}
