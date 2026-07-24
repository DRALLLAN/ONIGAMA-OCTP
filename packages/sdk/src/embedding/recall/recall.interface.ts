import type { VectorMemoryRecord } from "../../memory/vector";

export interface RecallEngine {

  recall(
    agentId: string,
    text: string,
    limit?: number
  ): Promise<VectorMemoryRecord[]>;

}
