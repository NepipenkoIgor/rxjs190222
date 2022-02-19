import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { filter, interval, map, skip, take, tap } from 'rxjs';

terminalLog('Теория');

// of(1, 2, 3, 4).subscribe((v) => {
// 	console.log(v);
// });

// from([1, 2, 3, 4])
// from(
// 	fetch('http://learn.javascript.ru/courses/groups/api/participants?key=198pddy').then((res) =>
// 		res.json(),
// 	),
// )
// ajax({
// 	url: 'http://learn.javascript.ru/courses/groups/api/participants?key=198pddy',
// 	crossDomain: true,
// 	method: 'GET',
// })
// 	.pipe(pluck('response'))
// 	.subscribe((v) => {
// 		console.log(v);
// 	});

// timer(5000).subscribe((v) => {
// 	console.log(v);
// });
//
// const random = Math.round(Math.random() * 10);
// console.log(random);
// iif(
// 	() => {
// 		return random > 5;
// 	},
// 	of('First sequence '),
// 	of('Second sequence '),
// )

// defer(() => {
// 	return random > 8
// 		? of('First sequence ')
// 		: random > 5
// 		? of('Second sequence ')
// 		: of('Third sequence ');
// }).subscribe((v) => {
// 	console.log(v);
// });

const sequence$ = interval(1000);

/*
   
 sequence$  ---0---1---2---3---4---5---6---7---8---9---
   tap((v)=>{
     console.log(v);
     return  1;
   })
            ---0---1---2---3---4---5---6---7---8---9---
   map((x)=>x*2)
            ---0---2---4---6---8---10---12---14---16---18--- 
   filter((x)=>x%3=== 0)
            ---0-----------6-----------12---------------18----- 
   skip(2)         
            ---------------------------12---------------18
   take(1)         
            ---------------------------12|
 */

sequence$
	.pipe(
		tap((v) => {
			console.log(v);
			return 1;
		}),
		map((x) => x * 2),
		filter((x) => x % 3 === 0),
		skip(2),
		take(1),
	)
	.subscribe((v) => {
		terminalLog(v);
	});
