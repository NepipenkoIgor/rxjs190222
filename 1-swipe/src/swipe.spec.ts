import { TestScheduler } from 'rxjs/testing';
import { getX, swipe } from './swipe';
import { zip } from 'rxjs';

function createTouchEvent(clientX: number): TouchEvent {
	return new TouchEvent('event', {
		changedTouches: [new Touch({ clientX, identifier: 1, target: new EventTarget() })],
	});
}

describe('[Swipe] test functionality ', () => {
	let testScheduler: TestScheduler;
	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});
	it('getX should transform right', function () {
		testScheduler.run((helpers) => {
			const { hot, expectObservable } = helpers;
			const sequence1$ = hot('-a--b----c--|', {
				a: createTouchEvent(2),
				b: createTouchEvent(3),
				c: createTouchEvent(100),
			});
			const expected = '              -a--b----c--|';
			expectObservable(getX(sequence1$)).toBe(expected, {
				a: 2,
				b: 3,
				c: 100,
			});
		});
	});

	it('swipe should work right', function () {
		testScheduler.run((helpers) => {
			const { hot, expectObservable } = helpers;
			const touch1$ = hot('-a----b------|', {
				a: createTouchEvent(2),
				b: createTouchEvent(30),
			});
			const touch2$ = hot('---a-----b-----c---|', {
				a: createTouchEvent(20),
				b: createTouchEvent(2),
			});
			const expected = '              ---a-----b---|';
			expectObservable(swipe(zip(getX(touch1$), getX(touch2$)))).toBe(expected, {
				a: 18,
				b: -28,
			});
		});
	});
});
