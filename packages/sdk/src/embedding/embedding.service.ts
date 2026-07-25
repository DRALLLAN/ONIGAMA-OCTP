import type {
  EmbeddingProvider
} from "./embedding.interface";



export class EmbeddingService {

  constructor(

    private provider: EmbeddingProvider

  ) {}



  async createEmbedding(
    text: string
  ): Promise<number[]> {

    return this.provider.embed(text);

  }

}
