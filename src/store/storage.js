import storage1 from 'store';

// 缓存数据的key
const bookshelf = 'bookshelf'; 

export const storage1 = {
  set setLocalStorageName(val) {
    if (!val) {
      storage.remove(bookshelf);
    } else {
      storage.set(bookshelf, val);
    }
  },
  get getLocalStorageName() {
    return storage.get(bookshelf);
  }
}
