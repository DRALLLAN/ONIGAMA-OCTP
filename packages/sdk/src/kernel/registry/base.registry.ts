import type { Registry } from "../registry";


export class BaseRegistry<T extends { id: string }>
implements Registry<T> {


  private items = new Map<string,T>();


  register(item:T):void {

    this.items.set(
      item.id,
      item
    );

  }


  get(id:string):T|undefined {

    return this.items.get(id);

  }


  has(id:string):boolean {

    return this.items.has(id);

  }


  list():T[] {

    return Array.from(
      this.items.values()
    );

  }

}
