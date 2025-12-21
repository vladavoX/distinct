import { isEqual } from 'lodash-es';

/**
 * Returns a new array with all duplicate elements removed from the input array.
 * Uses deep equality comparison for objects and arrays.
 *
 * @template T - The type of elements in the array
 * @param {T[]} arr - The input array to remove duplicates from
 * @returns {T[]} A new array containing only unique elements
 *
 * @example
 * distinct([1, 2, 2, 3, 1])
 * // Returns: [1, 2, 3]
 *
 * @example
 * distinct([{ id: 1 }, { id: 2 }, { id: 1 }])
 * // Returns: [{ id: 1 }, { id: 2 }]
 */
function distinct<T>(arr: T[]): T[] {
	const result: T[] = [];

	const primitiveSeen = new Set<
		string | number | boolean | symbol | null | undefined | bigint
	>();
	const complexSeen: T[] = [];

	outer: for (const item of arr) {
		const type = typeof item;

		// Handle primitive types and null
		if (item === null || (type !== 'object' && type !== 'function')) {
			if (
				primitiveSeen.has(
					item as
						| string
						| number
						| boolean
						| symbol
						| null
						| undefined
						| bigint,
				)
			) {
				continue;
			}
			primitiveSeen.add(
				item as string | number | boolean | symbol | null | undefined | bigint,
			);
			result.push(item);
			continue;
		}

		// Handle complex types (objects, arrays, functions)
		for (const existing of complexSeen) {
			if (isEqual(existing, item)) {
				continue outer;
			}
		}

		complexSeen.push(item);
		result.push(item);
	}

	return result;
}

/**
 * Returns a new array with duplicate elements removed based on a key function.
 * The first occurrence of each unique key is kept. Uses deep equality comparison for complex keys.
 *
 * @template T - The type of elements in the array
 * @template K - The type of the key returned by the key function
 * @param {T[]} arr - The input array to remove duplicates from
 * @param {(item: T) => K} keyFn - A function that extracts the comparison key from each element
 * @returns {T[]} A new array containing only elements with unique keys
 *
 * @example
 * distinctBy([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 1, name: 'Charlie' }], x => x.id)
 * // Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 *
 * @example
 * distinctBy(['apple', 'apricot', 'banana', 'blueberry'], x => x[0])
 * // Returns: ['apple', 'banana']
 */
function distinctBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
	const result: T[] = [];

	const primitiveKeys = new Set<
		string | number | boolean | symbol | null | undefined | bigint
	>();
	const complexKeys: K[] = [];

	outer: for (const item of arr) {
		const key = keyFn(item);
		const type = typeof key;

		// Handle primitive keys and null
		if (key === null || (type !== 'object' && type !== 'function')) {
			if (
				primitiveKeys.has(
					key as string | number | boolean | symbol | null | undefined | bigint,
				)
			) {
				continue;
			}
			primitiveKeys.add(
				key as string | number | boolean | symbol | null | undefined | bigint,
			);
			result.push(item);
			continue;
		}

		// Handle complex keys (objects, arrays, functions)
		for (const existingKey of complexKeys) {
			if (isEqual(existingKey, key)) {
				continue outer;
			}
		}

		complexKeys.push(key);
		result.push(item);
	}

	return result;
}

export { distinct, distinctBy };
