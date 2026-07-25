import {
  ServiceContainer,
  TOKENS
} from "../core/container";

import {
  loadConfig
} from "../core/config";

import type {
  OCTPConfig
} from "../core/config";

import {
  InMemoryEventBus
} from "../core/events";

import type {
  IEventBus
} from "../core/events";

import {
  ConsoleLogger
} from "../core/logger";

import type {
  Logger
} from "../core/logger";

import {
  Kernel
} from "../kernel";

import {
  OCTPPlanner
} from "../planner";



/**
 * Builds the ServiceContainer the runtime is assembled from.
 *
 * This is the single place OCTPRuntime's dependencies are constructed --
 * per the architecture docs ("All dependencies are resolved through
 * Dependency Injection"), OCTPRuntime itself should resolve services
 * from a container rather than `new` them directly.
 */
export function buildOCTPContainer(
  config: OCTPConfig = loadConfig()
): ServiceContainer {

  const container =
    new ServiceContainer();


  const logger: Logger =
    new ConsoleLogger();

  const eventBus: IEventBus =
    new InMemoryEventBus(logger);

  const kernel =
    new Kernel(eventBus);

  const planner =
    new OCTPPlanner();


  container.register(TOKENS.CONFIG, config);
  container.register(TOKENS.LOGGER, logger);
  container.register(TOKENS.EVENT_BUS, eventBus);
  container.register(TOKENS.KERNEL, kernel);
  container.register(TOKENS.PLANNER, planner);


  return container;

}
