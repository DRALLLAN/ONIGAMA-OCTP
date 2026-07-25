import {
  createClient,
  RedisClientType
} from "redis";

import {
  loadConfig
} from "../core/config";



export class RedisMemoryClient {



  private client:
    RedisClientType;



  constructor(
    redisUrl?: string
  ) {


    this.client =
      createClient({

        url:
          redisUrl ??
          loadConfig().redis.url

      });



  }



  async connect() {


    if (
      !this.client.isOpen
    ) {

      await this.client.connect();

    }


  }



  getClient() {


    return this.client;


  }



}
