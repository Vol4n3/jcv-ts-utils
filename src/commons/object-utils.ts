export module objectUtils {
  export const updateItem = <T, U extends keyof T>(
    current: T,
    key: U,
    value: T[U]
  ): T => {
    return { ...current, [key]: value };
  };
  export const removeItem = <T, U extends keyof T>(
    current: T,
    key: U
  ): Omit<T, U> => {
    const { [key]: omit, ...extract } = current;
    return extract;
  };
}
