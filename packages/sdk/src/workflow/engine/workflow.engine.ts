import type {
  Workflow
} from "../workflow.interface";



export class WorkflowEngine {



  async execute(
    workflow: Workflow,
    input: unknown
  ): Promise<unknown> {


    return workflow.execute(
      input
    );


  }


}
