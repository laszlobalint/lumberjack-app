import { LocalDataSource as Ng2LocalDataSource } from 'ng2-smart-table';

class LocalDataSource<T> extends Ng2LocalDataSource {
  protected data: Array<T>;
  protected filteredAndSorted: Array<T>;
  protected sortConf: Array<any>;
  protected filterConf: any;
  protected pagingConf: any;
  constructor(data?: Array<T>) {
    super(data);
  }
  load(data: Array<T>): Promise<any> {
    return super.load(data);
  }
  prepend(element: T): Promise<any> {
    return super.prepend(element);
  }
  append(element: T): Promise<any> {
    return super.append(element);
  }
  add(element: T): Promise<any> {
    return super.add(element);
  }
  remove(element: T): Promise<any> {
    return super.remove(element);
  }
  update(element: T, values: T): Promise<any> {
    return super.update(element, values);
  }
  find(element: T): Promise<T> {
    return super.find(element);
  }
  getElements(): Promise<Array<T>> {
    return super.getElements();
  }
  getFilteredAndSorted(): Promise<Array<T>> {
    return super.getFilteredAndSorted();
  }
  getAll(): Promise<Array<T>> {
    return super.getAll();
  }
  reset(silent?: boolean): void {
    return super.reset(silent);
  }
  empty(): Promise<any> {
    return super.empty();
  }
  count(): number {
    return super.count();
  }
  setSort(conf: Array<SortConfig<T>>, doEmit?: boolean): LocalDataSource<T> {
    return super.setSort(conf, doEmit) as LocalDataSource<T>;
  }
  setFilter(conf: Array<FilterConfig<T>>, andOperator?: boolean, doEmit?: boolean): LocalDataSource<T> {
    return super.setFilter(conf, andOperator, doEmit) as LocalDataSource<T>;
  }
  addFilter(fieldConf: FilterConfig<T>, andOperator?: boolean, doEmit?: boolean): LocalDataSource<T> {
    return super.addFilter(fieldConf, andOperator, doEmit) as LocalDataSource<T>;
  }
  setPaging(page: number, perPage: number, doEmit?: boolean): LocalDataSource<T> {
    return super.setPaging(page, perPage, doEmit) as LocalDataSource<T>;
  }
  setPage(page: number, doEmit?: boolean): LocalDataSource<T> {
    return super.setPage(page, doEmit) as LocalDataSource<T>;
  }
  getSort(): any {
    return super.getSort();
  }
  getFilter(): any {
    return super.getFilter();
  }
  getPaging(): any {
    return super.getPaging();
  }
  protected prepareData(data: Array<T>): Array<T> {
    return super.prepareData(data);
  }
  protected sort(data: Array<T>): Array<T> {
    return super.sort(data);
  }
  protected filter(data: Array<T>): Array<T> {
    return super.filter(data);
  }
  protected paginate(data: Array<T>): Array<T> {
    return super.paginate(data);
  }
}

export interface SortConfig<T> {
  field: keyof T;
  direction: 'asc' | 'desc' | null;
  compare?: Function | null;
}

export interface FilterConfig<T> {
  field: keyof T;
  search?: any;
  filter?: (cell: any, query: any) => boolean | null;
}

export default LocalDataSource;
