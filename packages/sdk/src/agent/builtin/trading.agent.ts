import {
  BaseAgent
} from "../base.agent";

import type {
  AgentContext
} from "../agent.context";

import type {
  AgentResult
} from "../agent.result";

import {
  MarketAnalysisAgent
} from "./market-analysis.agent";

import {
  RiskAgent
} from "./risk.agent";



export class TradingAgent
extends BaseAgent {



  id =
    "trading-agent";



  name =
    "Trading Intelligence Agent";



  private marketAgent =
    new MarketAnalysisAgent();



  private riskAgent =
    new RiskAgent();





  override async run(
    input: unknown,
    context?: AgentContext
  ): Promise<AgentResult> {



    const request =
      input as {

        symbol?: string;

        timeframe?: string;

        balance?: number;

        riskPercent?: number;

        stopLoss?: number;

      };




    const market =
      await this.marketAgent.run(
        {
          symbol:
            request.symbol,

          timeframe:
            request.timeframe

        },
        context
      );



    if (!market.success) {

      return market;

    }




    const risk =
      await this.riskAgent.run(
        {
          balance:
            request.balance,

          riskPercent:
            request.riskPercent,

          stopLoss:
            request.stopLoss

        },
        context
      );



    if (!risk.success) {

      return risk;

    }




    return {


      success: true,


      data: {


        symbol:
          request.symbol,


        market:
          market.data,


        risk:
          risk.data,


        decision:
          "READY_FOR_EXECUTION"


      }


    };



  }


}
