import {
  createClient,
  RedisClientType
} from "redis";



export class RedisMemoryClient {



  private client:
    RedisClientType;



  constructor() {


    this.client =
      createClient({

        url:
          process.env.REDIS_URL ??
          "redis://localhost:6379"

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
