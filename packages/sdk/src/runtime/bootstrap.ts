import {
  OCTPRuntime
} from "./octp.runtime";

import type {
  ServiceContainer
} from "../core/container";



export function createOCTPRuntime(
  container?: ServiceContainer
) {


  return new OCTPRuntime(
    container
  );


}
