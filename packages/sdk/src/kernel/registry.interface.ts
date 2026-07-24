export interface Registry<T> {

  register(
    item: T
  ): void;


  get(
    id: string
  ): T | undefined;


  has(
    id: string
  ): boolean;


  list(): T[];

}
