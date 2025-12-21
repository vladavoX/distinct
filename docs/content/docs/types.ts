export interface Distinct {
  /**
   * Returns a new array with all duplicate elements removed from the input array.
   * Uses deep equality comparison for objects and arrays.
   *
   * @template T - The type of elements in the array
   * @param {T[]} arr - The input array to remove duplicates from
   * @returns {T[]} A new array containing only unique elements
   */
  distinct<T>(arr: T[]): T[];
}

export interface DistinctBy {
  /**
   * Returns a new array with duplicate elements removed based on a key function.
   * The first occurrence of each unique key is kept. Uses deep equality comparison for complex keys.
   *
   * @template T - The type of elements in the array
   * @template K - The type of the key returned by the key function
   * @param {T[]} arr - The input array to remove duplicates from
   * @param {(item: T) => K} keyFn - A function that extracts the comparison key from each element
   * @returns {T[]} A new array containing only elements with unique keys
   */
  distinctBy<T, K>(arr: T[], keyFn: (item: T) => K): T[];
}
