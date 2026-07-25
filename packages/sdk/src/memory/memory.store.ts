import type {
  MemoryAdapter
} from "./memory.adapter";


import type {
  MemoryRecord
} from "./memory.record";



export class MemoryStore
implements MemoryAdapter {



  private records:
    MemoryRecord[] = [];





  async save(
    record: MemoryRecord
  ): Promise<void> {


    this.records.push(
      record
    );


  }






  async get(
    agentId: string,
    key: string
  ): Promise<MemoryRecord | undefined> {


    return this.records.find(
      item =>
        item.agentId === agentId &&
        item.key === key
    );


  }






  async list(
    agentId: string
  ): Promise<MemoryRecord[]> {


    return this.records.filter(
      item =>
        item.agentId === agentId
    );


  }


}
