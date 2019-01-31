export class ObservableStub {
    subscribeCounter: number;
    unsubscribeCounter: number;

    constructor() {
        this.subscribeCounter = 0;
        this.unsubscribeCounter = 0;
    }

    pipe(input: any) {
        return { subscribe: this.subscribe };
    }

    subscribe(input: any) {
        this.subscribeCounter += 1;
        return {
            unsubscribe: this.unsubscribe
        };
    }

    unsubscribe() {
        this.unsubscribeCounter += 1;
    }
}
