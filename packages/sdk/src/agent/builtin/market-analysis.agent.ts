import {
  BaseAgent
} from "../base.agent";

import type {
  AgentContext
} from "../agent.context";

import type {
  AgentResult
} from "../agent.result";

import type {
  KernelContext
} from "../kernel.context";



export class MarketAnalysisAgent
extends BaseAgent {


  id =
    "market-analysis";


  name =
    "Market Analysis Agent";



  override async run(
    input: unknown,
    context?: AgentContext & KernelContext
  ): Promise<AgentResult> {


    const request =
      input as {
        symbol?: string;
        timeframe?: string;
      };



    if (!context?.kernel) {

      throw new Error(
        "Kernel context is required"
      );

    }



    const marketData =
      await context.kernel.executeTool(
        "market-data",
        {
          symbol:
            request.symbol ?? "XAUUSD",

          timeframe:
            request.timeframe ?? "15m"
        }
      );



    const data =
      marketData as {
        symbol: string;
        price: number;
        trend: string;
        volatility: number;
      };



    return {


      success: true,


      data: {


        symbol:
          data.symbol,


        market: {


          price:
            data.price,


          trend:
            data.trend,


          volatility:
            data.volatility


        },


        analysis: {


          signal:

            data.trend === "bullish"

              ? "BUY"

              : data.trend === "bearish"

                ? "SELL"

                : "WAIT"


        }


      }


    };


  }


}
