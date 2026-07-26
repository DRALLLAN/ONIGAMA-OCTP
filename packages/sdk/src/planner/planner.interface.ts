import type { PlanResult } from "./plan.result";


export interface Planner {


  createPlan(
    task: unknown
  ): Promise<PlanResult>;


}
