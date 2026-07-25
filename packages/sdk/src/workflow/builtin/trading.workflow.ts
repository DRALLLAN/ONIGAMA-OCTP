import {
  BaseWorkflow
} from "../workflow";

import {
  MarketStep
} from "./market.step";

import {
  RiskStep
} from "./risk.step";

import {
  DecisionStep
} from "./decision.step";

import type {
  Kernel
} from "../../kernel";



export class TradingWorkflow
extends BaseWorkflow {


  id =
    "trading-workflow";



  constructor(
    kernel: Kernel
  ) {


    super([

      new MarketStep(kernel),

      new RiskStep(kernel),

      new DecisionStep()

    ]);


  }


}
