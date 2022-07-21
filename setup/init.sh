echo "checking node modules..."
npm install
echo "database setup..."
mkdir -p .db
node setup/database-setup.js
echo "starting..."
npm start