import { OCTPError } from "./octp.error";

export class RegistryError extends OCTPError {
  constructor(message: string, cause?: unknown) {
    super(message, "REGISTRY_ERROR", cause);
  }
}
