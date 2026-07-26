export interface Tool {

  id: string;

  name: string;

  execute(
    input: unknown
  ): Promise<unknown>;

}
