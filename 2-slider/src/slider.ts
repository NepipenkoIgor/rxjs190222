import {
	combineLatest,
	debounceTime,
	fromEvent,
	map,
	Observable,
	startWith,
	tap,
	withLatestFrom,
} from 'rxjs';

const qualitySlider = $('#quality').slider();
const ratingSlider = $('#rating').slider();
const actualSlider = $('#actual').slider();

interface ISliderResult {
	element: HTMLElement;
	value: number;
}

function colorizeSlider({ element, value }: any) {
	element.classList.remove('bad', 'good', 'warn');
	if (value < 40) {
		element.classList.add('bad');
		return;
	}
	if (value >= 40 && value <= 70) {
		element.classList.add('warn');
		return;
	}
	element.classList.add('good');
}

function getValue(
	source$: Observable<any>,
	sideCb: (result: ISliderResult) => void,
	initialValue: ISliderResult,
) {
	return source$.pipe(
		map(({ delegateTarget, value: { newValue } }) => {
			const element = delegateTarget.previousElementSibling.querySelector('.slider-track');
			return {
				element,
				value: newValue * 10,
			};
		}),
		startWith(initialValue),
		tap(sideCb),
		debounceTime(300),
		map(({ value }) => value),
	);
}

function sliderSequence(source$: Observable<[number, number, number]>) {
	return source$.pipe(
		map(([rating, quality, actual]) => {
			return Math.round((rating + quality + actual) / 3);
		}),
	);
}

fromEvent(document.querySelector('#send-result')!, 'click')
	.pipe(
		withLatestFrom(
			sliderSequence(
				combineLatest([
					getValue(fromEvent(qualitySlider, 'change'), colorizeSlider, {
						element: qualitySlider.prev().get(0)!.querySelector('.slider-track') as HTMLElement,
						value: 50,
					}),
					getValue(fromEvent(ratingSlider, 'change'), colorizeSlider, {
						element: ratingSlider.prev().get(0)!.querySelector('.slider-track') as HTMLElement,
						value: 50,
					}),
					getValue(fromEvent(actualSlider, 'change'), colorizeSlider, {
						element: actualSlider.prev().get(0)!.querySelector('.slider-track') as HTMLElement,
						value: 50,
					}),
				]),
			),
		),
		map(([, result]) => result),
	)
	.subscribe((v) => {
		console.log(v);
	});
