import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { filter, interval, map, pipe } from 'rxjs';

terminalLog('Теория');

// function doNothing<T>(source$: Observable<T>) {
// 	return source$;
// }

//
// function toText<T>(_source: Observable<T>) {
// 	return new Observable((subscriber) => {
// 		subscriber.next('My Text');
// 		subscriber.complete();
// 	});
// }

// function double(source: Observable<number>): Observable<number> {
// 	return new Observable<number>((subscriber) => {
// 		const sub = source.subscribe({
// 			next: (value) => subscriber.next(value * 2),
// 			error: (err) => subscriber.error(err),
// 			complete: () => subscriber.complete(),
// 		});
// 		return () => {
// 			sub.unsubscribe();
// 		};
// 	});
// }

//
// const sub = interval(1000)
// 	.pipe(
// 		tap((v) => console.log(v)),
// 		doNothing,
// 		// toText,
// 	)
// class DoubleSubscriber extends Subscriber<any> {
// 	public override next(value?: any) {
// 		super.next(value * 2);
// 	}
// }
//
// const o$ = new Observable();
// o$.source = interval(1000);
// o$.operator = {
// 	call(subscriber: Subscriber<unknown>, source: any): void {
// 		source.subscribe(new DoubleSubscriber(subscriber));
// 	},
// };

// const double = (source: Observable<number>) => {
// 	return source.lift({
// 		call(subscriber: Subscriber<unknown>, s: any): void {
// 			s.subscribe(new DoubleSubscriber(subscriber));
// 		},
// 	});
// };

// interval(1000)
// 	.pipe(double)
// 	.subscribe({
// 		next: (v) => {
// 			console.log('Sub ===>', v);
// 		},
// 		complete: () => {
// 			console.log('complete');
// 		},
// 	});

// function pipe(...fns: Function[]) {
// 	return function <T>(source: Observable<T>) {
// 		return fns.reduce((s, fn) => {
// 			return fn(s);
// 		}, source);
// 	};
// }

const doubleWithFilter = pipe(
	map((x: number) => x * 2),
	filter((x: number) => x % 3 === 0),
);

interval(1000)
	.pipe(doubleWithFilter)
	.subscribe({
		next: (v) => {
			console.log('Sub ===>', v);
		},
		complete: () => {
			console.log('complete');
		},
	});

// setTimeout(() => {
// 	sub.unsubscribe();
// }, 5000);
