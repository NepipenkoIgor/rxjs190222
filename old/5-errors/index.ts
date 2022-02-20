import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { catchError, EMPTY, interval, map, of, switchMap, tap, zip } from 'rxjs';

terminalLog('Теория');

const sequence1$ = interval(500);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
const sequence$ = zip(sequence1$, sequence2$);

sequence$
	.pipe(
		switchMap(([, x]) => {
			return of(x).pipe(
				map((_x) => {
					return (_x as any).toUpperCase();
					// try {
					// 	return (x as any).toUpperCase();
					// } catch (err) {
					// 	return 'N';
					// }
				}),
				tap(() => {
					console.log('after map');
				}),
				// retry(3),
				// retryWhen((obs) => obs.pipe(delay(3000))),
				catchError((err) => {
					console.log(err);
					return EMPTY; //of('N');
				}),
				tap(() => {
					console.log('after catch');
				}),
			);
		}),
	)
	.subscribe({
		next: (v) => {
			terminalLog(v);
		},
		error: (err) => {
			console.log(err);
		},
		complete: () => {
			console.log('complete');
		},
	});
