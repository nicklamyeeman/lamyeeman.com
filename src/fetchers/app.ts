import { useMemo, useState } from "react";
import { getFirebaseValue } from "../firebase/firebase_utils";

export const useApp = () => {
  return useMemo(async () => {
    const fetcher = await getFirebaseValue("/").then((snapshot) =>
      snapshot.val()
    );
    console.log(fetcher)
  }, []);
};
