import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');

// console.log('start');
// setTimeout(() => {
// 	console.log('time 1');
// });
// setTimeout(() => {
// 	console.log('time 2');
// });
// Promise.resolve().then(() => {
// 	console.log('prom 1');
// });
// Promise.resolve().then(() => {
// 	console.log('prom 2');
// });
// console.log('end');

/*
    start --- time1 --- time2
    end
    prom1
    prom2
 */

// console.log('start');
// of(1, 2, 3, 4, 5)
// 	.pipe(
// 		// subscribeOn()
// 		tap((v) => console.log('of operator scheduler', v)),
// 		observeOn(asyncScheduler),
// 		tap((v) => console.log(' asyncScheduler', v)),
// 	)
// 	.subscribe((v) => {
// 		console.log(v);
// 	});
// console.log('end');

// const sequence1$ = from([1, 2], asyncScheduler);
// const sequence2$ = of(10);
//
// const sequence$ = combineLatest([sequence1$, sequence2$]).pipe(map(([x, y]) => x + y));
//
// sequence$.subscribe((v) => {
// 	console.log(v);
// });

// const signal: Subject<number> = new Subject<number>();
// let count = 0;
// const calc = (_count: number) => console.log('do some calc');
// console.log('Start');
// signal.pipe(take(1600), observeOn(queueScheduler)).subscribe(() => {
// 	calc(count);
// 	signal.next(count++);
// });
// signal.next(count++);
// console.log('Stop');
