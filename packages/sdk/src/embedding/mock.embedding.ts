import type {
  EmbeddingProvider
} from "./embedding.interface";



export class MockEmbeddingProvider
implements EmbeddingProvider {



  async embed(
    text: string
  ): Promise<number[]> {

    const vector: number[] = [];

    for (let i = 0; i < 128; i++) {

      vector.push(
        ((text.charCodeAt(i % text.length) || 0) % 100) / 100
      );

    }

    return vector;

  }

}
