import type { Memory } from "./memory.interface";


export class MemoryRuntime {


  constructor(
    private memory: Memory
  ) {}



  async remember(
    key: string,
    value: unknown
  ): Promise<void> {


    await this.memory.set(
      key,
      value
    );


  }



  async recall<T = unknown>(
    key: string
  ): Promise<T | undefined> {


    return this.memory.get<T>(
      key
    );


  }



  async forget(
    key: string
  ): Promise<void> {


    await this.memory.delete(
      key
    );


  }


}
