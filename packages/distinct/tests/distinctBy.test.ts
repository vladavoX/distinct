import { describe, expect, test } from 'bun:test';

import { distinctBy } from '../src';

describe('distinctBy', () => {
	describe('primitive values and simple selectors', () => {
		test('removes duplicates from numbers using a key selector', () => {
			const input = [1, 2, 3, 4, 5, 6];
			const output = distinctBy(input, (num) => num % 3);
			expect(output).toEqual([1, 2, 3]); // Keys are 1, 2, 0
		});

		test('removes duplicates from strings using a key selector', () => {
			const input = ['apple', 'banana', 'apricot', 'blueberry', 'cherry'];
			const output = distinctBy(input, (str) => str.charAt(0));
			expect(output).toEqual(['apple', 'banana', 'cherry']); // Keys are 'a', 'b', 'c'
		});

		test('returns an empty array for empty input', () => {
			const input: number[] = [];
			const output = distinctBy(input, (num) => num);
			expect(output).toEqual([]);
		});

		test('returns the same array when all elements are unique for the key', () => {
			const input = [1, 2, 3, 4, 5];
			const output = distinctBy(input, (num) => num);
			expect(output).toEqual([1, 2, 3, 4, 5]);
		});

		test('returns a single element when all elements share the same key (identity)', () => {
			const input = ['a', 'a', 'a', 'a'];
			const output = distinctBy(input, (str) => str);
			expect(output).toEqual(['a']);
		});

		test('keeps the first element when multiple items share the same key', () => {
			const input = [5, 8, 11, 2]; // all % 3 => 2
			const output = distinctBy(input, (n) => n % 3);
			expect(output).toEqual([5]); // first with key 2
		});

		test('supports case-insensitive distinctness via the selector', () => {
			const input = ['Apple', 'apple', 'BANANA', 'banana', 'Cherry'];
			const output = distinctBy(input, (s) => s.toLowerCase());
			expect(output).toEqual(['Apple', 'BANANA', 'Cherry']);
		});

		test('handles null and undefined values as elements and keys', () => {
			const input = [null, undefined, null, undefined];
			const output = distinctBy(input, (value) => value);
			expect(output).toEqual([null, undefined]);
		});

		test('collapses to the first element when selector returns a constant key', () => {
			const input = [1, 2, 3, 4];
			const output = distinctBy(input, () => 'same-key');
			expect(output).toEqual([1]);
		});

		test('handles selectors that map to mixed primitive keys', () => {
			const input = [0, 1, 2, 3, 4];
			// even -> "even", odd -> true
			const output = distinctBy(input, (n) => (n % 2 === 0 ? 'even' : true));
			// first even (0) and first odd (1)
			expect(output).toEqual([0, 1]);
		});
	});

	describe('complex values and deep key equality', () => {
		test('deduplicates objects based on a simple object key', () => {
			const obj1 = { id: 1, name: 'Alice' };
			const obj2 = { id: 2, name: 'Bob' };
			const obj3 = { id: 3, name: 'Alice' }; // Different id, same name as obj1
			const obj4 = { id: 4, name: 'Bob' }; // Different id, same name as obj2
			const input = [obj1, obj2, obj3, obj4];
			const output = distinctBy(input, (item) => item.name);
			expect(output).toEqual([obj1, obj2]); // obj3 and obj4 are considered duplicates based on name
		});

		test('deduplicates arrays using a derived string key', () => {
			const input = [
				[1, 2],
				[3, 4],
				[1, 2],
				[5, 6],
				[3, 4],
			];
			const output = distinctBy(input, (arr) => arr.toString());
			expect(output).toEqual([
				[1, 2],
				[3, 4],
				[5, 6],
			]);
		});

		test('deduplicates objects based on complex object keys', () => {
			const obj1 = { id: 1, details: { age: 25, city: 'New York' } };
			const obj2 = { id: 2, details: { age: 30, city: 'Los Angeles' } };
			const obj3 = { id: 3, details: { age: 25, city: 'New York' } }; // Duplicate details of obj1
			const input = [obj1, obj2, obj3];
			const output = distinctBy(input, (item) => item.details);
			expect(output).toEqual([obj1, obj2]); // obj3 is considered duplicate based on details
		});

		test('deduplicates objects using nested arrays as keys', () => {
			const input = [
				{ id: 1, tags: ['a', 'b'] },
				{ id: 2, tags: ['c', 'd'] },
				{ id: 3, tags: ['a', 'b'] }, // Duplicate tags of id 1
			];
			const output = distinctBy(input, (item) => item.tags);
			expect(output).toEqual([
				{ id: 1, tags: ['a', 'b'] },
				{ id: 2, tags: ['c', 'd'] },
			]);
		});

		test('deduplicates objects using nested structures as keys', () => {
			const input = [
				{ id: 1, info: { scores: [10, 20], active: true } },
				{ id: 2, info: { scores: [15, 25], active: false } },
				{ id: 3, info: { scores: [10, 20], active: true } }, // Duplicate info of id 1
			];
			const output = distinctBy(input, (item) => item.info);
			expect(output).toEqual([
				{ id: 1, info: { scores: [10, 20], active: true } },
				{ id: 2, info: { scores: [15, 25], active: false } },
			]);
		});

		test('treats structurally equal but non-identical complex keys as duplicates', () => {
			const input = [
				{ id: 1, meta: { a: 1, b: 2 } },
				{ id: 2, meta: { b: 2, a: 1 } }, // same logical content, different literal object
				{ id: 3, meta: { a: 2, b: 3 } },
			];

			const output = distinctBy(input, (item) => item.meta);
			expect(output).toEqual([
				{ id: 1, meta: { a: 1, b: 2 } },
				{ id: 3, meta: { a: 2, b: 3 } },
			]);
		});
	});

	describe('behavior', () => {
		test('does not mutate the input array', () => {
			const input = [{ id: 1 }, { id: 1 }];
			const copy = input.map((x) => ({ ...x })); // deep-ish copy for safety

			const output = distinctBy(input, (item) => item.id);

			expect(input).toEqual(copy); // unchanged
			expect(output).toEqual([{ id: 1 }]); // distinct result
		});
	});
});
