import type {
  VectorMemoryRecord
} from "./vector.record";



export interface VectorMemory {



  save(
    record: VectorMemoryRecord
  ): Promise<void>;



  search(
    agentId: string,
    vector: number[],
    limit?: number
  ): Promise<VectorMemoryRecord[]>;



  list(
    agentId: string
  ): Promise<VectorMemoryRecord[]>;



}
