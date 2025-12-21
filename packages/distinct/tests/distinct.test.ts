import { describe, expect, test } from 'bun:test';

import { distinct } from '../src';

describe('distinct', () => {
	describe('primitive values', () => {
		test('removes duplicate numbers', () => {
			const input = [1, 2, 2, 3, 4, 4, 5];
			const output = distinct(input);
			expect(output).toEqual([1, 2, 3, 4, 5]);
		});

		test('removes duplicate strings', () => {
			const input = ['apple', 'banana', 'apple', 'orange', 'banana'];
			const output = distinct(input);
			expect(output).toEqual(['apple', 'banana', 'orange']);
		});

		test('returns an empty array for empty input', () => {
			const input: number[] = [];
			const output = distinct(input);
			expect(output).toEqual([]);
		});

		test('returns the same array when all elements are unique', () => {
			const input = [1, 2, 3, 4, 5];
			const output = distinct(input);
			expect(output).toEqual([1, 2, 3, 4, 5]);
		});

		test('returns a single element when all elements are identical', () => {
			const input = ['a', 'a', 'a', 'a'];
			const output = distinct(input);
			expect(output).toEqual(['a']);
		});

		test('preserves the order of first occurrences', () => {
			const input = [3, 1, 3, 2, 1, 4];
			const output = distinct(input);
			expect(output).toEqual([3, 1, 2, 4]);
		});

		test('handles boolean values', () => {
			const input = [true, false, true, true, false];
			const output = distinct(input);
			expect(output).toEqual([true, false]);
		});

		test('treats NaN as equal and 0 and -0 as equal', () => {
			const input = [NaN, NaN, 0, -0];
			const output = distinct(input);

			expect(output.length).toBe(2);
			expect(Number.isNaN(output[0])).toBe(true);
			expect(output[1]).toBe(0); // 0 and -0 are considered equal by isEqual
		});

		test('handles null and undefined values', () => {
			const input = [null, undefined, null, undefined];
			const output = distinct(input);
			expect(output).toEqual([null, undefined]);
		});
	});

	describe('complex values', () => {
		test('removes duplicate plain objects by deep equality', () => {
			const obj1 = { id: 1, name: 'Alice' };
			const obj2 = { id: 2, name: 'Bob' };
			const obj3 = { id: 1, name: 'Alice' }; // Duplicate of obj1
			const obj4 = { name: 'Alice', id: 1 }; // Same as obj1 but different key order
			const input = [obj1, obj2, obj3, obj4];
			const output = distinct(input);
			expect(output).toEqual([obj1, obj2]); // obj3 and obj4 are considered duplicates of obj1
		});

		test('removes duplicate arrays by deep equality', () => {
			const input = [
				[1, 2],
				[3, 4],
				[1, 2],
				[5, 6],
				[3, 4],
			];
			const output = distinct(input);
			expect(output).toEqual([
				[1, 2],
				[3, 4],
				[5, 6],
			]);
		});

		test('removes duplicates in nested object structures', () => {
			const input = [
				{ id: 1, data: [1, 2, 3] },
				{ id: 2, data: [4, 5, 6] },
				{ id: 1, data: [1, 2, 3] }, // Duplicate of first object
				{ id: 3, data: [7, 8, 9] },
				{ id: 2, data: [4, 5, 6] }, // Duplicate of second object
			];
			const output = distinct(input);
			expect(output).toEqual([
				{ id: 1, data: [1, 2, 3] },
				{ id: 2, data: [4, 5, 6] },
				{ id: 3, data: [7, 8, 9] },
			]);
		});

		test('handles mixed types with deep equality', () => {
			const input = [
				1,
				'1',
				{ id: 1 },
				{ id: '1' },
				[1, 2],
				[1, '2'],
				1,
				'1',
				{ id: 1 },
				[1, 2],
			];
			const output = distinct(input);
			expect(output).toEqual([
				1,
				'1',
				{ id: 1 },
				{ id: '1' },
				[1, 2],
				[1, '2'],
			]);
		});

		test('deduplicates identical complex structures', () => {
			const input = [
				{ a: 1, b: [2, 3] },
				{ a: 1, b: [2, 3] },
				{ a: 1, b: [2, 3] },
			];
			const output = distinct(input);
			expect(output).toEqual([{ a: 1, b: [2, 3] }]);
		});

		test('treats objects with different nested content as distinct', () => {
			const input = [
				{ id: 1, data: [1, 2, 3] },
				{ id: 1, data: [1, 2, 4] }, // differs by last element
				{ id: 1, data: [1, 2, 3] }, // duplicate of first
			];

			const output = distinct(input);
			expect(output).toEqual([
				{ id: 1, data: [1, 2, 3] },
				{ id: 1, data: [1, 2, 4] },
			]);
		});

		test('treats arrays with the same members but different order as distinct', () => {
			const input = [
				[1, 2, 3],
				[3, 2, 1],
				[1, 2, 3],
			];

			const output = distinct(input);
			expect(output).toEqual([
				[1, 2, 3],
				[3, 2, 1],
			]);
		});
	});

	describe('behavior', () => {
		test('does not mutate the input array', () => {
			const input = [{ id: 1 }, { id: 1 }];
			const copy = input.map((x) => ({ ...x })); // deep-ish copy for safety

			const output = distinct(input);

			expect(input).toEqual(copy); // unchanged
			expect(output).toEqual([{ id: 1 }]); // distinct result
		});
	});
});
