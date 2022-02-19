import { Observable, Subscriber } from 'rxjs';

class SkipLimitSubscriber extends Subscriber<any> {
	private interval = 1;

	private count = 1;

	public constructor(
		subscriber: Subscriber<any>,
		private readonly skip: number,
		private readonly limit: number,
	) {
		super(subscriber);
	}

	public override next(value?: any) {
		const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
		const borderRight = borderLeft + this.limit;
		if (borderLeft < this.count && this.count <= borderRight) {
			super.next(value);
			this.count++;
			if (borderRight < this.count) {
				this.interval++;
			}
			return;
		}
		this.count++;
	}
}

export function skipLimit(skip: number, limit: number) {
	return function (source: Observable<number>): Observable<number> {
		return new Observable<number>((subscriber) => {
			const sub = source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit));
			return () => {
				sub.unsubscribe();
			};
		});
	};
}
