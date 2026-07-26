import type { Workflow } from "./workflow.interface";
import type { ExecutionContext } from "./execution.context";


export class WorkflowRuntime {

  async run(
    workflow: Workflow,
    context: ExecutionContext
  ): Promise<ExecutionContext> {

    return (await workflow.execute(context)) as ExecutionContext;

  }

}
