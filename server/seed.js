const db = require ('./config/connection.js');
const { User } = require('./models/index.js');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  
  await User.deleteMany({});
  
  const users = await User.create(userSeeds);
  
  console.log(users);
  process.exit(0);
});