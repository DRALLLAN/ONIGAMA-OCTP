import type { Step } from "./step.interface";


export class StepRuntime {


  async execute(
    step: Step,
    input: unknown
  ): Promise<unknown> {


    return step.execute(
      input
    );


  }


}
