import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs';

describe('Test example', () => {
	let testScheduler: TestScheduler;
	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});
	it('should test example', function () {
		testScheduler.run((helpers) => {
			const { cold, expectObservable } = helpers;
			const sequence1$ = cold('-a--b---c---|', {
				a: 1,
				b: 3,
				c: 10,
			});
			const expected = '-a--b---c---|';
			expectObservable(sequence1$.pipe(map((x) => x * 2))).toBe(expected, {
				a: 2,
				b: 6,
				c: 20,
			});
		});
	});
});
