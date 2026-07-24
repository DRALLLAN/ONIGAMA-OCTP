import { Kernel } from "../../kernel";
import { MarketAnalysisAgent } from "./market-analysis.agent";
import { MarketDataTool } from "../../mcp";



describe("MarketAnalysisAgent", () => {


  it("should analyze market", async () => {


    const kernel = new Kernel();



    kernel.registerTool(
      new MarketDataTool()
    );



    kernel.registerAgent(
      new MarketAnalysisAgent()
    );



    const result =
      await kernel.executeAgent(
        "market-analysis",
        {
          symbol: "XAUUSD",
          timeframe: "15m",
          price: 2385
        }
      );



    expect(result)
      .toBeDefined();



  });


});
