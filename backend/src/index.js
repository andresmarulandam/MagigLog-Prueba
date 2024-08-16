import app from './app.js';
import { connectDatabase } from './config/database.js';

connectDatabase();
app.listen(3000);
console.log('server on port', 3000);
