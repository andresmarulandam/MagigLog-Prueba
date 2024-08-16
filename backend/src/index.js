import app from './app.js';
import { connectDatabase } from './config/database.js';
import { configuration } from './config/config.js';

const { port } = configuration.server;

connectDatabase();

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
