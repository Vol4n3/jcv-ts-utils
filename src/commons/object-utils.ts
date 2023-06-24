export module ObjectUtils {
  export const updateItem = <T, U extends keyof T>(
    current: T,
    key: U,
    value: T[U]
  ): T => {
    return { ...current, [key]: value };
  };
  export const removeItemById = <T, U extends keyof T>(
    current: T,
    key: U
  ): Omit<T, U> => {
    const { [key]: omit, ...extract } = current;
    return extract;
  };
}
