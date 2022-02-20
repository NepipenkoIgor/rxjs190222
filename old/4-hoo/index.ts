import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { exhaustMap, fromEvent, pluck } from 'rxjs';
import { ajax } from 'rxjs/ajax';

terminalLog('Теория');

const sequence$ = fromEvent(document.querySelector('input')!, 'input').pipe(
	exhaustMap((event) => {
		const text = (event.target as HTMLInputElement).value;
		return ajax({
			url: `http://learn.javascript.ru/courses/groups/api/participants?key=198pddy&text=${text}`,
			crossDomain: true,
			method: 'GET',
		}).pipe(pluck('response'));
	}),
	// map + switchAll => switchMap
	// map + concatAll => concatMap
	// map + mergeAll => mergeMap
	// map + mergeAll => mergeMap
	// exhaust + exhaustAll => exhaustMap
);

sequence$.subscribe((v) => {
	console.log('Sub ===>', v);
});
