export const indexedDBServices = {
  // Hàm mở database, có thể sử dụng tên bảng khác
  async openDB(nameTable = "realtime_data") {
    try {
      return await new Promise((resolve, reject) => {
        const request = indexedDB.open(nameTable, 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(nameTable)) {
            db.createObjectStore(nameTable, { keyPath: "id" });
          }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error(`Failed to open DB: ${error}`);
      throw error;
    }
  },

  // Hàm lưu dữ liệu
  async saveData(data, nameTable = "realtime_data") {
    try {
      const db = await this.openDB(nameTable);
      const transaction = db.transaction(nameTable, "readwrite");
      const store = transaction.objectStore(nameTable);

      if (Array.isArray(data)) {
        data.forEach((item) => store.put(item)); // Ghi đè dữ liệu nếu đã tồn tại
      } else {
        store.put(data);
      }

      await transaction.complete; // Đảm bảo rằng giao dịch hoàn thành
    } catch (error) {
      console.error(`Failed to save data in ${nameTable}: ${error}`);
      throw error;
    }
  },

  // Hàm lấy tất cả dữ liệu
  async getAllData(nameTable = "realtime_data") {
    try {
      const db = await this.openDB(nameTable);
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(nameTable, "readonly");
        const store = transaction.objectStore(nameTable);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Failed to get all data from ${nameTable}: ${error}`);
      throw error;
    }
  },

  // Hàm lấy dữ liệu theo ID
  async getDataById(id, nameTable = "realtime_data") {
    try {
      const db = await this.openDB(nameTable);
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(nameTable, "readonly");
        const store = transaction.objectStore(nameTable);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Failed to get data by ID from ${nameTable}: ${error}`);
      throw error;
    }
  },

  // Hàm kiểm tra dữ liệu có tồn tại không
  async dataExists(id, nameTable = "realtime_data") {
    const data = await this.getDataById(id, nameTable);
    return data !== undefined && data !== null; // Kiểm tra null hoặc undefined
  },

  // Hàm xóa dữ liệu theo ID
  async deleteData(id, nameTable = "realtime_data") {
    try {
      const db = await this.openDB(nameTable);
      const transaction = db.transaction(nameTable, "readwrite");
      const store = transaction.objectStore(nameTable); 

      store.delete(id);
      await transaction.complete; // Đảm bảo rằng giao dịch hoàn thành
    } catch (error) {
      console.error(`Failed to delete data from ${nameTable}: ${error}`);
      throw error;
    }
  },

  // Hàm xóa tất cả dữ liệu
  async clearAllData(nameTable = "realtime_data") {
    try {
      const db = await this.openDB(nameTable);
      const transaction = db.transaction(nameTable, "readwrite");
      const store = transaction.objectStore(nameTable);

      store.clear();
      await transaction.complete; // Đảm bảo rằng giao dịch hoàn thành
    } catch (error) {
      console.error(`Failed to clear all data from ${nameTable}: ${error}`);
      throw error;
    }
  },
};
