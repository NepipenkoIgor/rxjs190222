import { cold } from 'jasmine-marbles';
import { skipLimit } from './skip-limit';

describe('[Swipe] test functionality ', () => {
	it('getX should transform right', function () {
		const sequence$ = cold('-a--b----c----d---e-|', {
			a: 1,
			b: 2,
			c: 100,
			d: 10,
			e: 50,
		});
		const expected = cold('----b----c--------e-|', {
			b: 2,
			c: 100,
			e: 50,
		});
		expect(sequence$.pipe(skipLimit(1, 2))).toBeObservable(expected);
	});
});
