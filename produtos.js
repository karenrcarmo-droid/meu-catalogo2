import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Cria a tabela de lanches automaticamente se ela não existir
    await sql`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT,
      category TEXT,
      price DECIMAL(10,2),
      image_url TEXT
    );`;

    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM products ORDER BY category ASC;`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { id, title, category, price, image_url } = req.body;
      await sql`INSERT INTO products (id, title, category, price, image_url) 
                VALUES (${id}, ${title}, ${category}, ${price}, ${image_url});`;
      return res.status(201).json({ message: 'Sucesso' });
    }
    
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`DELETE FROM products WHERE id = ${id};`;
      return res.status(200).json({ message: 'Removido' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}