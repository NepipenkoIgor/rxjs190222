import { concatAll, map, Observable, shareReplay, switchMap, timer, toArray } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

export interface IUser {
	profileName: string;
	firstName: string;
	surname: string;
	country: string;
}

class UserService {
	public uniqueNameSequence$: Observable<string[]> = timer(0, 16000).pipe(
		switchMap(() => {
			return ajax<IUser[]>({
				url: 'http://learn.javascript.ru/courses/groups/api/participants?key=198pddy',
				crossDomain: true,
			}).pipe(
				map((res: AjaxResponse<IUser[]>) => res.response),
				concatAll(),
				map((user) => user.profileName),
				toArray(),
			);
		}),
		shareReplay(),
	);

	// public uniqueNameSequence$: Observable<string[]> = ajax<IUser[]>({
	// 	url: 'http://learn.javascript.ru/courses/groups/api/participants?key=198pddy',
	// 	crossDomain: true,
	// }).pipe(
	// 	map((res: AjaxResponse<IUser[]>) => res.response),
	// 	concatAll(),
	// 	map((user) => user.profileName),
	// 	toArray(),
	// 	shareReplay(),
	// 	// share({
	// 	// 	connector: () => new ReplaySubject(),
	// 	// 	resetOnComplete: false,
	// 	// 	resetOnError: false,
	// 	// 	resetOnRefCountZero: false,
	// 	// }),
	// );
}

export const userService = new UserService();
