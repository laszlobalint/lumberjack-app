import LocalDataSource from './LocalDataSource';

export interface SmartTableConfirm<T> {
  resolve(newData?: T): any;
  reject(): any;
}

export interface CreateConfirm<T> {
  newData: T;
  source: LocalDataSource<T>;
  confirm: SmartTableConfirm<T>;
}

export interface EditConfirm<T> {
  data: T;
  newData: T;
  source: LocalDataSource<T>;
  confirm: SmartTableConfirm<T>;
}

export interface DeleteConfirm<T> {
  data: T;
  source: LocalDataSource<T>;
  confirm: SmartTableConfirm<T>;
}
