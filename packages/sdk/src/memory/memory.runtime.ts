import type { MemoryAdapter } from "./memory.adapter";


export class MemoryRuntime {


  constructor(
    private adapter: MemoryAdapter
  ) {}



  async remember(
    agentId: string,
    key: string,
    value: unknown
  ): Promise<void> {


    await this.adapter.save({
      id: `${agentId}:${key}:${Date.now()}`,
      agentId,
      key,
      value,
      createdAt: new Date()
    });


  }



  async recall<T = unknown>(
    agentId: string,
    key: string
  ): Promise<T | undefined> {


    const record =
      await this.adapter.get(
        agentId,
        key
      );

    return record?.value as T | undefined;


  }



  async forget(
    agentId: string,
    key: string
  ): Promise<void> {


    await this.adapter.delete(
      agentId,
      key
    );


  }


}
