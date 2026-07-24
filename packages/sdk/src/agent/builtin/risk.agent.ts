import {
  BaseAgent
} from "../base.agent";

import type {
  AgentContext
} from "../agent.context";

import type {
  AgentResult
} from "../agent.result";



export class RiskAgent
extends BaseAgent {


  id =
    "risk-agent";


  name =
    "Risk Management Agent";




  override async run(
    input: unknown,
    context?: AgentContext
  ): Promise<AgentResult> {



    const data =
      input as {

        balance?: number;

        riskPercent?: number;

        stopLoss?: number;

        rewardRatio?: number;

      };




    const balance =
      data.balance ?? 10000;



    const riskPercent =
      data.riskPercent ?? 1;



    const stopLoss =
      data.stopLoss ?? 20;



    const rewardRatio =
      data.rewardRatio ?? 2;




    const riskAmount =
      balance *
      (riskPercent / 100);




    const lotSize =
      Number(
        (
          riskAmount /
          (stopLoss * 10)
        ).toFixed(2)
      );




    return {


      success: true,


      data: {


        risk: {


          balance,

          riskPercent,

          riskAmount,


        },


        trade: {


          lotSize,

          stopLoss,

          takeProfit:

            stopLoss *
            rewardRatio,


          rewardRatio


        }


      }


    };


  }


}
