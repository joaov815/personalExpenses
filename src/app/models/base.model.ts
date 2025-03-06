export interface IBase {
  id: string;
  createdAt?: Date;
  updateAt?: Date;
}

export abstract class Base<T> implements IBase {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }

  id: string;
  createdAt?: Date;
  updateAt?: Date;
}
