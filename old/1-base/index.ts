import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { filter, Observable, pluck, Subscriber } from 'rxjs';

terminalLog('Теория');

// const sequence = new Promise((res, rej) => {
//     let count = 0;
//     setInterval(() => {
//         console.log(count);
//         res(count++);
//     }, 1000)
// });
//
// sequence.then((v) => {
//     console.log(v);
// })
//
// sequence.then((v) => {
//     console.log(v);
// })
// sequence.then((v) => {
//     console.log(v);
// })
// sequence.then((v) => {
//     console.log(v);
// })

// const sequence = function* iteratorFn(){
//     let item  = 0;
//     while (true){
//         yield item++
//     }
// }()
//
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);

// @ts-ignore
// const sequence$ = interval(1000)
//
// setTimeout(() => {
//     sequence$.subscribe((v) => {
//         console.log(v)
//     })
//
// }, 5000)

// const sequence$ = new Observable((subscriber: Subscriber<any>) => {
//     terminalLog('START');
//     let count = 1;
//     const intervalId = setInterval(() => {
//         console.log(count);
//         // if (count % 5 === 0) {
//         //     subscriber.complete();
//         //     return;
//         // }
//         subscriber.next(count++);
//     }, 1000);
//
//     return () => {
//         clearInterval(intervalId);
//         terminalLog('ON UNSUBSCRIBE');
//     }
// });

const socket: WebSocket = new WebSocket(
	'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self',
);

const sequence$ = new Observable((subscriber: Subscriber<any>) => {
	terminalLog('START');

	function listener(v: MessageEvent) {
		subscriber.next(v);
	}

	socket.addEventListener('message', listener);

	return () => {
		socket.removeEventListener('message', listener);
		terminalLog('ON UNSUBSCRIBE');
	};
});

function main() {
	let count = 1;
	setInterval(() => {
		socket.send((count++).toString());
	}, 1000);

	sequence$
		.pipe(
			pluck('data'),
			filter((v) => !v.includes('{')),
		)
		.subscribe({
			next: (v) => {
				terminalLog(`Sub 1===>${v}`);
			},
			complete: () => {
				terminalLog('complete');
			},
		});

	setTimeout(() => {
		sequence$
			.pipe(
				pluck('data'),
				filter((v) => !v.includes('{')),
			)
			.subscribe({
				next: (v) => {
					terminalLog(`Sub 2===>${v}`);
				},
				complete: () => {
					terminalLog('complete');
				},
			});
	}, 5000);
}

main();

// setTimeout(() => {
//     sub.unsubscribe();
// }, 2000)
