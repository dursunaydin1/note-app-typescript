import { useEffect, useState } from "react";

// Özel bir hook: localStorage ile değer saklama ve senkronize etme işlevselliği sağlar.
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State'i oluşturun ve başlangıç değerini, localStorage'dan alınan değer veya
  // verilen başlangıç değeri kullanarak ayarlayın.
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  // useEffect kullanarak, değer değiştiğinde localStorage'a kaydedin.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // [değer, değeri güncelleme fonksiyonu] çiftini döndürün.
  // Bu çift, hook'u kullanan komponentin değeri okumasına ve güncellemesine izin verir.
  return [value, setValue] as [T, typeof setValue];
}
