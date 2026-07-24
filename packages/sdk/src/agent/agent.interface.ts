export interface Agent {
  id: string;

  name: string;

  execute(
    input: unknown
  ): Promise<unknown>;
}
