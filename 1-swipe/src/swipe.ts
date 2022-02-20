import { filter, map, Observable, zip, merge, fromEvent } from 'rxjs';

export function getX(source$: Observable<MouseEvent | TouchEvent>) {
	return source$.pipe(
		map((event: MouseEvent | TouchEvent) => {
			if (event instanceof MouseEvent) {
				return event.clientX;
			}
			return event.changedTouches[0]!.clientX;
		}),
	);
}

const down$ = getX(
	merge(
		fromEvent<MouseEvent>(document, 'mousedown'),
		fromEvent<MouseEvent>(document, 'touchstart'),
	),
	// fromEvent<MouseEvent>(document, 'mousedown').pipe(
	// 	mergeWith(fromEvent<TouchEvent>(document, 'touchstart')),
	// ),
);
const up$ = getX(
	merge(fromEvent<MouseEvent>(document, 'mouseup'), fromEvent<MouseEvent>(document, 'touchend')),
);
// fromEvent<MouseEvent>(document, 'mouseup').pipe(
// 	mergeWith(fromEvent<TouchEvent>(document, 'touchend')),
// ),

export function swipe(source$: Observable<[number, number]>): Observable<number> {
	return source$.pipe(
		map(([starX, endX]) => {
			return endX - starX;
		}),
		filter((value) => value !== 0),
	);
}

export const swipe$ = swipe(zip(down$, up$));

// combineLatest([
// 	fromEvent<MouseEvent>(document, 'click'),
// 	fromEvent<MouseEvent>(document, 'keydown'),
// 	fromEvent<MouseEvent>(document, 'mousemove'),
// ])
