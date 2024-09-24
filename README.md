npm install express pg pg-hstore sequelize dotenv jsonwebtoken bcryptjs
npm install dotenv

npm i nodemon

npx sequelize-cli init

npx sequelize-cli migration:generate --name add-bookmarks-to-users

npx sequelize-cli db:migrate


CREATE INDEX idx_event_location ON "Events" USING GIST (location);


It is based on the user's current location, and the backend calculates and returns the events sorted by proximity whenever the user selects the "Sort by Distance" option.