import '../../assets/css/style.css';
import { skipLimit } from './skip-limit';
import { fromEvent, map, tap } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

/*
  ---0---1---2---3---4---5---6---7---8---9---
    skipLimit(2,2)
  -----------2---3-----------6---7-----------
 */

const sub = fromEvent<MouseEvent>(document, 'click')
	.pipe(
		tap((v) => {
			console.log(v);
		}),
		map((event: MouseEvent) => event.clientX),
		skipLimit(2, 2),
	)
	.subscribe(terminalLog);

setTimeout(() => {
	sub.unsubscribe();
}, 7000);
