import {
  collection,
  getCountFromServer,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const db = getFirestore();
  const tweetsCol = collection(db, "tweets");
  const [countTweets, setCountTweets] = useState(0);
//1.yöntem
  // useEffect(() => {
  //   const fetchData = async () => { // async fonksiyon oluştur
  //     const snapshot = await getCountFromServer(tweetsCol); // await anahtar kelimesi kullanılacak
  //     const count = snapshot.data().count;
  //     setCountTweets(count); // veriyi konsola yazdır
  //   };

  //   fetchData(); // fetchData fonksiyonunu çağır
  // }, []);
// 2.yöntem
  useEffect(() => {
    onSnapshot(tweetsCol, (snapshot) => {
      setCountTweets(snapshot.size);
    });
  }, []);

  return (
    <div className="max-xl:hidden p-4">
      <h1 className="text-xl font-semibold">Gönderi Sayısı : {countTweets}</h1>
    </div>
  );
};

export default React.memo(Aside);
