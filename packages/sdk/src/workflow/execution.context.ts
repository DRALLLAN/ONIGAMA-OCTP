export interface ExecutionContext {

  workflowId: string;

  input: unknown;

  data: Record<string, unknown>;

}
