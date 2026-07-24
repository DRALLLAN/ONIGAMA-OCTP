import type {
  VectorMemory
} from "./vector.interface";


import type {
  VectorMemoryRecord
} from "./vector.record";



export class VectorMemoryStore
implements VectorMemory {



  private records:
    VectorMemoryRecord[] = [];





  async save(
    record: VectorMemoryRecord
  ): Promise<void> {


    this.records.push(
      record
    );


  }





  async search(
    agentId: string,
    vector: number[],
    limit = 5
  ): Promise<VectorMemoryRecord[]> {


    return this.records
      .filter(
        item =>
          item.agentId === agentId
      )
      .slice(0, limit);


  }





  async list(
    agentId: string
  ): Promise<VectorMemoryRecord[]> {


    return this.records.filter(
      item =>
        item.agentId === agentId
    );


  }


}
