import type {
  MemoryAdapter
} from "./memory.adapter";


import type {
  MemoryRecord
} from "./memory.record";


import {
  RedisMemoryClient
} from "./redis.client";




export class RedisMemoryStore
implements MemoryAdapter {



  constructor(
    private redis =
      new RedisMemoryClient()
  ) {}






  private key(
    agentId:string,
    key:string
  ) {

    return `memory:${agentId}:${key}`;

  }






  async save(
    record: MemoryRecord
  ): Promise<void> {



    await this.redis.connect();



    await this.redis
      .getClient()
      .set(

        this.key(
          record.agentId,
          record.key
        ),

        JSON.stringify(record)

      );


  }







  async get(
    agentId:string,
    key:string
  ): Promise<MemoryRecord | undefined> {



    await this.redis.connect();



    const data =
      await this.redis
        .getClient()
        .get(
          this.key(
            agentId,
            key
          )
        );



    if(!data) {

      return undefined;

    }



    return JSON.parse(
      data
    );


  }







  async list(
    agentId:string
  ): Promise<MemoryRecord[]> {


    return [];


  }


}
