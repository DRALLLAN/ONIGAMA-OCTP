# OCTP Architecture

Version: 1.0

Status: Approved

---

# 1. Vision

OCTP is an AI-Native Trading Intelligence Platform.

The system is designed around autonomous reasoning, modular intelligence,
workflow orchestration, and explainable decision making.

LLMs are replaceable components.

Business logic is not.

---

# 2. High Level Architecture

                    Client Layer
     ┌─────────────────────────────────────┐
     │ Flutter │ Web │ Admin │ AI Console │
     └─────────────────────────────────────┘
                    │
                    ▼
              API Gateway (NestJS)
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
 Domain APIs   Event Bus      Authentication
                    │
                    ▼
              AI Orchestrator
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
 Planner      Workflow Engine   Memory Engine
                    │
                    ▼
              Skill Runtime
                    │
                    ▼
                MCP Runtime
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
 Market      Journal      News
 Broker      Risk         Portfolio