import type {
  ServiceToken
} from "./service-token";

export class ServiceContainer {

  private services =
    new Map<ServiceToken, unknown>();

  register<T>(
    token: ServiceToken<T>,
    instance: T
  ): void {

    this.services.set(
      token,
      instance
    );

  }

  resolve<T>(
    token: ServiceToken<T>
  ): T {

    const service =
      this.services.get(token);

    if (!service) {

      throw new Error(
        `Service '${String(token)}' not registered`
      );

    }

    return service as T;

  }

  has(
    token: ServiceToken
  ): boolean {

    return this.services.has(token);

  }

}
