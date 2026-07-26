export const OCTP_EVENTS = {
  AGENT_REGISTERED: 'agent.registered',
  AGENT_UNREGISTERED: 'agent.unregistered',
  AGENT_EXECUTED: 'agent.executed',
  AGENT_EXECUTION_FAILED: 'agent.execution.failed',

  WORKFLOW_REGISTERED: 'workflow.registered',
  WORKFLOW_UNREGISTERED: 'workflow.unregistered',
  WORKFLOW_EXECUTED: 'workflow.executed',
  WORKFLOW_EXECUTION_FAILED: 'workflow.execution.failed',

  TOOL_REGISTERED: 'tool.registered',
  TOOL_UNREGISTERED: 'tool.unregistered',
  TOOL_EXECUTED: 'tool.executed',
  TOOL_EXECUTION_FAILED: 'tool.execution.failed'
} as const;

export type OCTPEventName = (typeof OCTP_EVENTS)[keyof typeof OCTP_EVENTS];
