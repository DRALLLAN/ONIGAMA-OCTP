import type {
  WorkflowStep
} from "./step.interface";

import type {
  ExecutionContext
} from "./execution.context";



export class BaseWorkflow {


  constructor(
    protected steps: WorkflowStep[]
  ) {}



  async execute(
    context: ExecutionContext
  ): Promise<ExecutionContext> {


    let current =
      context;



    for (const step of this.steps) {


      const result =
        await step.execute(
          current
        );



      current = {

        ...current,


        data: {

          ...current.data,

          [step.id]:
            result

        }

      };


    }



    return current;


  }


}
