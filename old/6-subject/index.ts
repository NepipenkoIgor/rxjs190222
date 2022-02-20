import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { AsyncSubject, map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

terminalLog('Теория');

// Subject = Observable + Observer

// const sequence$ = new Subject<number>();
// const sequence$ = new BehaviorSubject<number>(0);
// const sequence$ = new ReplaySubject<number>(undefined, 2000);
//const sequence$ = new AsyncSubject<number>();

// document.addEventListener('click', (e) => {
// 	sequence$.next(e.clientX);
// });
//
// sequence$.next(1);
// sequence$.next(2);
// sequence$.next(3);
//
// sequence$.subscribe((v) => {
// 	terminalLog(`Sub 1 -> ${v}`);
// });
// setTimeout(() => {
// 	sequence$.next(4);
// 	sequence$.next(5);
// 	sequence$.next(6);
// 	//console.log(sequence$.value);
// 	sequence$.complete();
// }, 4000);
//
// setTimeout(() => {
// 	sequence$.subscribe((v) => {
// 		terminalLog(`Sub 2 -> ${v}`);
// 	});
// 	sequence$.next(7);
// 	sequence$.next(8);
// 	sequence$.next(9);
// 	//console.log(sequence$.value);
// }, 5000);

function getItems<T>(url: string): Observable<T> {
	let subject: AsyncSubject<T>;
	return new Observable((subscriber) => {
		console.log('Create');
		if (!subject) {
			subject = new AsyncSubject<T>();
			ajax<T>({
				url,
				crossDomain: true,
			})
				.pipe(map((res: AjaxResponse<T>) => res.response))
				.subscribe(
					subject,
					// 	{
					// 	next: (v) => {
					// 		subject.next(v);
					// 	},
					// 	error: (err) => {
					// 		subject.error(err);
					// 	},
					// 	complete: () => {
					// 		subject.complete();
					// 	},
					// }
				);
			// subject.subscribe({
			// 	complete: () => {
			// 		console.log('COMPLETED');
			// 	},
			// });
		}
		return subject.subscribe(subscriber);
	});
}

const items$ = getItems('http://learn.javascript.ru/courses/groups/api/participants?key=198pddy');

items$.subscribe((v) => {
	console.log(`Sub 1 ->`, v);
});

setTimeout(() => {
	items$.subscribe((v) => {
		console.log(`Sub 2 -> `, v);
	});
}, 5000);
