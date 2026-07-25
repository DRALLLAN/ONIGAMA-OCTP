import type { MemoryRuntime } from "../memory";


export interface AgentContext {

  agentId: string;

  input: unknown;

  memory?: MemoryRuntime;

  metadata?: Record<string, unknown>;

}
