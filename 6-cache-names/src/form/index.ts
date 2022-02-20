import {
	fromEvent,
	map,
	Observable,
	combineLatest,
	debounceTime,
	switchMap,
	EMPTY,
	of,
	withLatestFrom,
} from 'rxjs';
import { userService } from './user.service';

export class FormComponent {
	private valueSequence$!: Observable<string>;

	private input!: HTMLInputElement;

	private button!: HTMLButtonElement;

	public constructor(public formContainer: HTMLFormElement) {
		this.input = formContainer.querySelector('input') as HTMLInputElement;
		this.button = formContainer.querySelector('button') as HTMLButtonElement;
		this.valueSequence$ = combineLatest([
			fromEvent(this.input, 'input').pipe(map((event) => (event.target as HTMLInputElement).value)),
			userService.uniqueNameSequence$,
		]).pipe(
			debounceTime(300),
			switchMap(([value, names]: [string, string[]]) => {
				const isNotValid = names.find((name: string) => name === value);
				if (isNotValid) {
					this.input.classList.add('error');
					this.button.disabled = true;
					return EMPTY;
				}
				this.input.classList.remove('error');
				this.button.disabled = false;
				return of(value);
			}),
		);

		fromEvent(this.button, 'click')
			.pipe(
				withLatestFrom(this.valueSequence$),
				map(([, value]) => value),
			)
			.subscribe((v) => {
				console.log('To server', v);
			});
	}
}
