import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Sequelize, Model, DataTypes } from 'sequelize';

const app = express();
const PORT = 3000;

// Initialize Sequelize
const sequelize = new Sequelize('postgres://username:password@postgres:5432/database');

// Define the model
class MyModel extends Model {
  public id!: number;
  public country_code!: string;
  public balance!: number;
}
MyModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'my_table',
  }
);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', async (req: Request, res: Response) => {
  try {
    const data = await MyModel.findAll({ limit: 10 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/update-balance/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { balance } = req.body;

  try {
    const row = await MyModel.findByPk(id);
    if (!row) {
      return res.status(404).json({ error: 'Row not found' });
    }

    await row.update({ balance });
    res.json({ message: 'Balance updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
