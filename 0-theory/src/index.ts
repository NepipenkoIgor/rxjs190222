import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { interval, share } from 'rxjs';

terminalLog('Теория');

/*
 multicast + subject => publish connectable observable
 publish + refCount => regular observable => share
 */

// const subject = new BehaviorSubject(-1);
// const sequence$ = interval(1000).pipe(
// 	// multicast(subject),
// 	// publish(),
// 	// refCount(),
// 	share(),
// );
//
// const sequence$ = connectable(interval(1000), {
// 	connector: () => new Subject(),
// });
// sequence$.connect();

const sequence$ = interval(1000).pipe(
	share({
		resetOnError: false,
		resetOnComplete: false,
		resetOnRefCountZero: true,
	}),
);

// as ConnectableObservable<any>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//@ts-ignore
const sub = sequence$.subscribe((v) => {
	terminalLog(`Sub 1 ===> ${v}`);
});

// sequence$.connect();

setTimeout(() => {
	sub.unsubscribe();
}, 4000);

setTimeout(() => {
	sequence$.subscribe((v) => {
		terminalLog(`Sub 2 ===> ${v}`);
	});
}, 5000);
