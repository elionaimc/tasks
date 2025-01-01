import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public async save(key: string, value: string) {
    await Preferences.set({ key, value });
  }

  public async get(key: string) {
    return await Preferences.get({ key });
  }
  public async remove(key: string) {
    return await Preferences.remove({ key });
  }

  public async clear() {
    return await Preferences.clear();
  }
  
}
