// eslint-disable-next-line @typescript-eslint/ban-types
type Filter<T = {}> = {
  [K in keyof T]: T[K];
};
export default Filter;
export { Filter };
