import type { Plan } from "./plan.interface";


export class PlanExecutor {


  async execute(
    plan: Plan,
    input: unknown
  ): Promise<unknown> {


    let result = input;


    for (
      const step of plan.steps
    ) {


      result =
        await step.execute(
          result
        );


    }


    return result;


  }


}
