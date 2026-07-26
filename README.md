# OCTP

> **Open Cognitive Trading Platform**

Enterprise AI Runtime for Intelligent Trading Systems

---

# Vision

OCTP (Open Cognitive Trading Platform) is an AI-native runtime designed for building autonomous trading intelligence systems.

Unlike traditional trading platforms that focus only on execution, OCTP is designed around reasoning, planning, memory, workflow orchestration, and explainable decision making.

Large Language Models (LLMs) are treated as interchangeable components. Business logic remains independent from any specific AI provider.

---

# Mission

Build a modular, scalable, enterprise-grade AI runtime capable of powering:

* Trading Intelligence
* Portfolio Management
* Risk Analysis
* Market Research
* Financial Automation
* AI Agents
* Workflow Automation
* Multi-Agent Collaboration

---

# Core Principles

* AI First
* Event Driven
* Modular Architecture
* Explainable Decisions
* Provider Agnostic
* Enterprise Ready
* Testable
* Observable
* Extensible

---

# Architecture Overview

```
                Client Applications

     Flutter | Web | Admin | AI Console

                     │

                     ▼

               API Gateway

                     │

                     ▼

               OCTP Runtime

                     │

      ┌──────────────┼──────────────┐

      ▼              ▼              ▼

   Kernel        Planner      Workflow

                     │

                     ▼

               Agent Runtime

                     │

      ┌──────────────┼──────────────┐

      ▼              ▼              ▼

 Tool Runtime   Memory Engine   Event Bus

                     │

         ┌───────────┼─────────────┐

         ▼           ▼             ▼

      Redis      Vector Store   Embedding

                     │

                     ▼

             Semantic Recall
```

---

# Main Components

## Kernel

The Kernel is the heart of OCTP.

Responsibilities:

* Runtime lifecycle
* Agent execution
* Tool execution
* Workflow execution
* Dependency management

---

## Planner

Responsible for:

* Goal decomposition
* Planning
* Task sequencing
* Decision orchestration

---

## Workflow Engine

Responsible for deterministic execution.

Features:

* Sequential workflows
* Conditional execution
* Retry support
* Context propagation

---

## Agent Runtime

Provides:

* Agent lifecycle
* Memory access
* Tool access
* Planning support
* Explainable execution

---

## Memory System

OCTP provides multiple memory implementations.

* In-Memory
* Redis
* Vector Memory
* Semantic Recall

---

## Embedding Layer

Supports semantic understanding.

Current capabilities:

* Embedding generation
* Similarity search
* Semantic retrieval

Future providers:

* OpenAI
* Azure OpenAI
* Ollama
* HuggingFace
* Local Models

---

## Tool Runtime

Agents interact with the outside world through tools.

Examples:

* Market Data
* Risk Calculator
* Broker APIs
* News Providers
* Portfolio Analysis

---

# Current Status

Current SDK Version

```
v0.1.x
```

Completed

* Kernel
* Runtime
* Planner
* Workflow Engine
* Agent Runtime
* Tool Runtime
* Memory Runtime
* Redis Memory
* Vector Memory
* Embedding
* Semantic Recall
* Error Framework
* Logger
* Dependency Injection

In Progress

* Event Bus
* Configuration
* Registry

Planned

* Multi-Agent Runtime
* Plugin SDK
* Distributed Runtime
* LLM Runtime
* Enterprise Monitoring

---

# Repository Structure

```
apps/
packages/
docs/

packages/sdk/

agent/
kernel/
planner/
workflow/
memory/
embedding/
runtime/
mcp/
core/
```

---

# Documentation

Detailed documentation is available in the `docs/` directory.

* Architecture
* Runtime
* AI
* Infrastructure
* ADR
* Roadmap

---

# Development Philosophy

Business logic must never depend on infrastructure.

Infrastructure can change.

Business logic should not.

All dependencies are resolved through Dependency Injection.

All cross-module communication should occur through the Event Bus.

Every public API must have automated tests.

---

# Roadmap

v0.1.x

Core Stabilization

v0.2.x

Multi-Agent Runtime

v0.3.x

LLM Runtime

v0.4.x

Plugin SDK

v1.0.0

Enterprise Release

---

# Contributing

Contributions are welcome.

Please read the documentation before submitting pull requests.

Follow the coding standards and architecture rules defined in the `docs/` directory.

---

# License

Copyright © ONIGAMA

All rights reserved.
