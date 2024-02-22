import { getFirebaseValue } from "../firebase/firebase_utils";

export const fetchApp = () => getFirebaseValue(`/`);