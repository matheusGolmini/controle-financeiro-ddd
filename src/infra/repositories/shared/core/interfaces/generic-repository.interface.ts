export interface FilterInterface {
  [key: string]: string | number;
}

export interface GenericepositoryInterface<TargetEntity> {
  save: () => Promise<void>;
  delete: () => Promise<void>;
  find: (filter: FilterInterface) => Promise<TargetEntity[]>;
  exist: (filter: FilterInterface) => Promise<boolean>;
}
