import type { Registry } from "../registry";
import { RegistryError } from "../../core/errors";


export class BaseRegistry<T extends { id: string }>
implements Registry<T> {


  private items = new Map<string, T>();


  register(item: T): void {

    if (this.items.has(item.id)) {

      throw new RegistryError(
        `Item with id '${item.id}' is already registered`
      );

    }

    this.items.set(
      item.id,
      item
    );

  }


  unregister(id: string): boolean {

    return this.items.delete(id);

  }


  get(id: string): T | undefined {

    return this.items.get(id);

  }


  has(id: string): boolean {

    return this.items.has(id);

  }


  list(): T[] {

    return Array.from(
      this.items.values()
    );

  }

}
