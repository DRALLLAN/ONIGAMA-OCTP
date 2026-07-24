export interface WorkflowStep {
  id: string;

  execute(
    context: unknown
  ): Promise<unknown>;
}
