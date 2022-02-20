import { fromEvent, map, Observable, switchMap, takeUntil, tap } from 'rxjs';

export const box = document.querySelector('.draggable') as HTMLDivElement;

const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup').pipe(
	tap(() => {
		console.log('end');
	}),
);

export function drag(
	source1$: Observable<MouseEvent>,
	source2$: Observable<MouseEvent>,
	source3$: Observable<MouseEvent>,
) {
	return source1$.pipe(
		switchMap((start) => {
			start.preventDefault();
			console.log('start');
			return source2$.pipe(
				map((move) => {
					console.log('move');
					move.preventDefault();
					return {
						left: `${move.clientX - start.offsetX}px`,
						top: `${move.clientY - start.offsetY}px`,
					};
				}),
				takeUntil(source3$),
			);
		}),
	);
}

export const drag$ = drag(mousedown$, mousemove$, mouseup$);
