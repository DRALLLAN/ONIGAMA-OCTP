export interface Step {

  id: string;

  name: string;

  execute(
    input: unknown
  ): Promise<unknown>;

}
