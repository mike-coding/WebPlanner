// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'main-db';
const DB_VERSION = 1;
const STORE_NAME = 'items';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('name', 'name', { unique: false });
      }
    },
  });
};

export const getDB = initDB;
export const STORE = STORE_NAME;
