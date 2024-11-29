import { Injectable } from '@angular/core';
enum STORE_KEY_ENUM {
  ACCESS_TOKEN,
  RFC_TOKEN,
}
type STORE_KEY = keyof typeof STORE_KEY_ENUM;
@Injectable({ providedIn: 'root' })
export class StoreService {
  get(k: STORE_KEY) {
    return localStorage.getItem(k) ?? '';
  }
  set(k: STORE_KEY, value: string) {
    return localStorage.setItem(k, value);
  }
  remove(k: STORE_KEY) {
    return localStorage.removeItem(k);
  }
  clear() {
    return localStorage.clear();
  }
}
