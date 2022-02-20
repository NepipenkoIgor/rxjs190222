import {
	bufferCount,
	concatAll,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	Observable,
	reduce,
	switchMap,
	tap,
} from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

export interface IResult {
	name: string;
	description: string;
	owner: {
		avatar_url: string;
	};
}

export function liveSearch(
	source$: Observable<InputEvent>,
	requestSequenceFn: (text: string) => Observable<string>,
) {
	return source$.pipe(
		debounceTime(300),
		tap(() => {
			console.log('show loader');
		}),
		map((event: InputEvent) => {
			return (event.target as HTMLInputElement).value;
		}),
		filter((text: string) => text.length > 3),
		distinctUntilChanged(),
		switchMap(requestSequenceFn),
	);
}

export function createCard({ name, description, owner: { avatar_url } }: IResult) {
	return `
                      <div class="col-sm-6 col-md-4">
                         <div class="card">
                            <img class="card-img-top" src=${avatar_url} alt=${name}>
                            <div class="card-body">
                              <h3 class="card-title">${name}</h3>
                              <p class="card-text">${description}</p>
                            </div>
                         </div> 
                      </div>                 
                    `;
}

export function createRow(htmlStrings: string[]): string {
	return `<div class="row">${htmlStrings.join(' ')}</div>`;
}

export function requestToHtmlStr(source$: Observable<AjaxResponse<{ items: IResult[] }>>) {
	return source$.pipe(
		map((res: AjaxResponse<{ items: IResult[] }>) => res.response.items),
		concatAll(),
		map(createCard),
		bufferCount(3),
		reduce((resultStr: string, htmlStrs: string[]) => {
			const newStr = resultStr + createRow(htmlStrs);
			return newStr;
		}, ''),
		map((html: string) => html.trim().replace(/\s+(<)/g, '<')),
	);
}

//dispatch text
// ofType(action)

/*
 *  [item, item....]
 *   <div class=row >
 *     div
 *     div
 *     div
 *  </div>
 * */
