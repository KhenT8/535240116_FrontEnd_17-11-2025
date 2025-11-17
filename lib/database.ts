import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
export const db = new Database(dbPath);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS IceCream (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    rating INTEGER NOT NULL,
    isFavorite BOOLEAN DEFAULT 0,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const iceCreamService = {
  // GET all ice creams
  findAll() {
    const stmt = db.prepare('SELECT * FROM IceCream ORDER BY createdAt DESC');
    return stmt.all();
  },

  // GET ice cream by ID
  findById(id: number) {
    const stmt = db.prepare('SELECT * FROM IceCream WHERE id = ?');
    return stmt.get(id);
  },

  // CREATE new ice cream
  create(data: { name: string; brand: string; rating: number; isFavorite: boolean; description: string }) {
    const stmt = db.prepare(`
      INSERT INTO IceCream (name, brand, rating, isFavorite, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.name,
      data.brand,
      data.rating,
      data.isFavorite ? 1 : 0,
      data.description
    );
    
    return this.findById(result.lastInsertRowid as number);
  },

  // UPDATE ice cream
  update(id: number, updates: Partial<any>) {
    const fields = [];
    const values = [];
    
    if (updates.name) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.brand) {
      fields.push('brand = ?');
      values.push(updates.brand);
    }
    if (updates.rating) {
      fields.push('rating = ?');
      values.push(updates.rating);
    }
    if (updates.isFavorite !== undefined) {
      fields.push('isFavorite = ?');
      values.push(updates.isFavorite ? 1 : 0);
    }
    if (updates.description !== undefined) {
      fields.push('description = ?');
      values.push(updates.description);
    }
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = db.prepare(`
      UPDATE IceCream 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `);
    
    stmt.run(...values);
    return this.findById(id);
  },

  // DELETE ice cream
  delete(id: number) {
    const stmt = db.prepare('DELETE FROM IceCream WHERE id = ?');
    return stmt.run(id);
  }
};