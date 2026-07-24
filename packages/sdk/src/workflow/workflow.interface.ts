export interface Workflow {

  id: string;

  execute(
    input: unknown
  ): Promise<unknown>;

}
