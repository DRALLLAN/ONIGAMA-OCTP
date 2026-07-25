export interface Planner {


  createPlan(
    task: unknown
  ): Promise<PlanResult>;


}
