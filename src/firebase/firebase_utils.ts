import {
    get,
    off,
    onDisconnect,
    onValue,
    push,
    query,
    QueryConstraint,
    ref,
    set,
    update,
    DataSnapshot as FBDatasnapshot
} from 'firebase/database';

import { db } from './firebase.config';

export interface DataSnapshot<T = any> extends FBDatasnapshot {
    val(): T | null;

    child<U>(path: string): DataSnapshot<U>;
}
export const setFirebaseValue = <T>(targetRef: string | undefined, value: T) => {
    return set(ref(db, targetRef), value);
};
export const updateFirebaseValue = (targetRef: string | undefined, value: any) => {
    return update(ref(db, targetRef), value);
};
export const createFirebaseValue = <T>(targetRef: string | undefined, value: T) => {
    return push(ref(db, targetRef), value);
};
export const getNewId = (targetRef: string | undefined) => {
    return push(ref(db, targetRef)).key;
};

export const getFirebaseValue = <T>(targetRef: string, dataQuery?: QueryConstraint[]) => {
    if (dataQuery) {
        return get(query(ref(db, targetRef), ...dataQuery)) as Promise<DataSnapshot<T | null>>;
    }
    return get(ref(db, targetRef)) as Promise<DataSnapshot<T | null>>;
};

export const listenFirebaseValue = <T>(
    targetRef: { ref: string; dataQuery?: QueryConstraint[] },
    callback: (snapshot: DataSnapshot<T | null>) => unknown,
    error?: (error: Error) => unknown
) => {
    if (targetRef.dataQuery) {
        return onValue(query(ref(db, targetRef.ref), ...targetRef.dataQuery), callback, error);
    }
    return onValue(ref(db, targetRef.ref), callback, error);
};
export const disconnectFirebaseListener = <T>(
    targetRef: { ref: string; dataQuery?: QueryConstraint[] },
    callback?: (snapshot: DataSnapshot<T | null>) => unknown,
    event?: 'value'
) => {
    if (targetRef.dataQuery) {
        return off(query(ref(db, targetRef.ref), ...targetRef.dataQuery), event, callback);
    }
    return off(ref(db, targetRef.ref), event, callback);
};

export const setRefOnDisconnect = (targetRef: string, value: any) => {
    return onDisconnect(ref(db, targetRef)).set(value);
};
