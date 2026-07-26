export interface Registry<T> {

  register(
    item: T
  ): void;


  unregister(
    id: string
  ): boolean;


  get(
    id: string
  ): T | undefined;


  has(
    id: string
  ): boolean;


  list(): T[];

}
