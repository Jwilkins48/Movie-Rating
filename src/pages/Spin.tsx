import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import { Tabs } from "../components/Tabs";

interface watching {
  data: DocumentData;
  id: string;
}

interface SpinProps {
  active: number;
  setActive: (active: number) => void;
}

export function Spin({ active, setActive }: SpinProps) {
  const [watch, setWatch] = useState<watching[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      const movieRef = collection(db, "wantToWatch");
      const q = query(
        movieRef,
        where("userRef", "==", auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      const moviesArray: watching[] = [];
      querySnap.forEach((doc) => {
        return moviesArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setWatch(moviesArray);
      setLoading(false);
    };
    fetchMovies();
  }, [auth.currentUser?.uid]);

  return (
    <main>
      <Tabs active={active} setActive={setActive} />

      {loading ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        <div>
          <Spinner watch={watch} />
        </div>
      )}
    </main>
  );
}
