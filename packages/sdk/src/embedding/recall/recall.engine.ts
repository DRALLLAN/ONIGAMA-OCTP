import type {
  RecallEngine
} from "./recall.interface";

import type {
  VectorMemory
} from "../../memory/vector";

import type {
  EmbeddingService
} from "../embedding.service";

import type {
  VectorMemoryRecord
} from "../../memory/vector";

export class SemanticRecallEngine
implements RecallEngine {

  constructor(

    private embedding: EmbeddingService,

    private memory: VectorMemory

  ) {}

  async recall(

    agentId: string,

    text: string,

    limit = 5

  ): Promise<VectorMemoryRecord[]> {

    const vector =
      await this.embedding.createEmbedding(text);

    return this.memory.search(
      agentId,
      vector,
      limit
    );

  }

}
