import type { Plan } from "./plan.interface";
import type { Planner } from "./planner.interface";


export class PlannerRuntime {


  constructor(
    private planner: Planner
  ) {}



  async create(
    input: unknown
  ): Promise<Plan> {


    return this.planner.create(
      input
    );


  }

}
