
export enum State {
    PENDING = 'pending',
    ERROR = 'error',
    SUCCESS = 'success',
    EMPTY = 'empty',
}

export interface Pending {
    state: State.PENDING;
}

export interface Empty {
    state: State.EMPTY;
}

// Don't want to use name Error cause basic JS Error association
export interface Mistake {
    state: State.ERROR;
    message: string;
}

export interface Success<T> {
    state: State.SUCCESS;
    data: T;
}

export type Model<T> = Pending | Empty | Mistake | Success<T>;
