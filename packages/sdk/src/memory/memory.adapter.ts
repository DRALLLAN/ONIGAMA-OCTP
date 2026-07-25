import type {
  MemoryRecord
} from "./memory.record";


export interface MemoryAdapter {


  save(
    record: MemoryRecord
  ): Promise<void>;



  get(
    agentId: string,
    key: string
  ): Promise<MemoryRecord | undefined>;



  list(
    agentId: string
  ): Promise<MemoryRecord[]>;


}
