import { getX, swipe } from './swipe';
import { zip } from 'rxjs';
import { hot } from 'jasmine-marbles';

function createTouchEvent(clientX: number): TouchEvent {
	return new TouchEvent('event', {
		changedTouches: [new Touch({ clientX, identifier: 1, target: new EventTarget() })],
	});
}

describe('[Swipe] test functionality ', () => {
	it('getX should transform right', function () {
		const sequence1$ = hot('-a--b----c--|', {
			a: createTouchEvent(2),
			b: createTouchEvent(3),
			c: createTouchEvent(100),
		});
		const expected = hot('              -a--b----c--|', {
			a: 2,
			b: 3,
			c: 100,
		});
		expect(getX(sequence1$)).toBeObservable(expected);
	});

	it('swipe should work right', function () {
		const touch1$ = hot('-a----b------|', {
			a: createTouchEvent(2),
			b: createTouchEvent(30),
		});
		const touch2$ = hot('---a-----b-----c---|', {
			a: createTouchEvent(20),
			b: createTouchEvent(2),
		});
		const expected = hot('              ---a-----b---|', {
			a: 18,
			b: -28,
		});
		expect(swipe(zip(getX(touch1$), getX(touch2$)))).toBeObservable(expected);
	});
});
