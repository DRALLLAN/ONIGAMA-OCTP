import type { Step } from "./step.interface";


export interface Plan {

  id: string;

  name: string;

  steps: Step[];

}
