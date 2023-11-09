import "../firebase/firebase_init";

import { getFirebaseValue } from "../firebase/firebase_utils";

export const fetchApp = async () => getFirebaseValue(`/`);