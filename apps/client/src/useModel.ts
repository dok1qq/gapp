import { useEffect, useRef, useState } from 'react';

import { Model, State } from './model';


export function useMountModel<T, D>(asyncFn: (d: D) => Promise<T>, data: D) {
    const [model, setModel] = useState<Model<T>>({ state: State.EMPTY });
    const initRef = useRef(false);

    useEffect(() => {
        if (initRef.current) return;

        initRef.current = true;
        action(asyncFn, data);

    }, []);


    const action = async <D>(asyncFn: (d: D) => Promise<T>, data: D) => {
        let success = false;
        setModel({ state: State.PENDING });
        try {
            const result = await asyncFn(data);
            setModel({ state: State.SUCCESS, data: result });
            success = true;
        } catch (err) {
            const message = err instanceof Error
                ? err.message
                : JSON.stringify(err);
            setModel({ state: State.ERROR, message });
        }

        return success;
    };

    const reload = () => {
        action(asyncFn, data);
    };

    return {
        model,
        reload,
        error: model.state === State.ERROR,
        empty: model.state === State.EMPTY,
        success: model.state === State.SUCCESS,
        pending: model.state === State.PENDING,
    };
}

export function useActionModel<T>() {
    const [model, setModel] = useState<Model<T>>({ state: State.EMPTY });

    const action = async <D>(asyncFn: (d: D) => Promise<T>, data: D) => {
        let success = false;
        setModel({ state: State.PENDING });
        try {
            const result = await asyncFn(data);
            setModel({ state: State.SUCCESS, data: result });
            success = true;
        } catch (err) {
            const message = err instanceof Error
                ? err.message
                : JSON.stringify(err);
            setModel({ state: State.ERROR, message });
        }

        return success;
    };

    return {
        model,
        action,
        error: model.state === State.ERROR,
        empty: model.state === State.EMPTY,
        success: model.state === State.SUCCESS,
        pending: model.state === State.PENDING,
    };
}
