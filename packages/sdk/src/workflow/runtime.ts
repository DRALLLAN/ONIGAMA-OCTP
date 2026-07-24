import { Workflow } from "./workflow";
import type { ExecutionContext } from "./execution.context";


export class WorkflowRuntime {

  async run(
    workflow: Workflow,
    context: ExecutionContext
  ): Promise<ExecutionContext> {

    return workflow.execute(context);

  }

}
