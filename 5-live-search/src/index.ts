import 'bootstrap';
import '../../assets/css/style.css';
import './styles.css';
import { IResult, liveSearch, requestToHtmlStr } from './live-search';
import { fromEvent, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const input = document.querySelector('#search') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;
liveSearch(fromEvent<InputEvent>(input, 'input'), (text: string) => {
	return requestToHtmlStr(
		ajax<{ items: IResult[] }>({
			url: `https://api.github.com/search/repositories?q=${text}`,
			crossDomain: true,
		}),
	);
})
	.pipe(tap(() => console.log('hide loader')))
	.subscribe((htmlStr: string) => {
		container.innerHTML = htmlStr;
	});
