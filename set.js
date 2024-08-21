const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtCRkU3VG9ITVloaDdnRFZOakF4UUkzUFlQOHB1ZTBDa21Xb1VTZWpVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclRuYU1WcSt6ZlIzZlpEN09HekFYSzBvOGxCNWFNYURPelZyZnNndC9pMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Ty9VSGtGdEE4eEJtTkwxSGxCSDZNdWxQdXp0TUtLcEM1R2Q3bXBVSjBVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTb0NldXh1YnVYdGs3bnRScEZmU0xTTDZVYXdRMGlMM1E4UGcvc05QZG5FPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNJUGIvdUVlRVRzNGY3T3d5Vmk1eEVJSzM4TXdnZVgrL1I5a3NBQ0ZnVTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJmV3VRejFySjlXMURRTDJCaWdPZ0FrMG9KNG1PZzhtWXNreFJhRVFWa1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkZKcmFDOFNzV3d0M3ZXNWZkL25QUE9tRDJ0MUFTN0w4QjdESEJmNDdGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaFBOM2cvTDJJSzc2OGQyVk90ZHNPbW5sdWVlZG90OEFkZUx1cWI5aExuND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklpVUo2NHVUaWF1YWNuQnh4TkprOEZqaFFlejFFNEt0WDFJU29yZE5hYUFCMWpkWUJWT3R2UHhKUitpSUpsMjlRWWFUK2pPM1VoblcySDQ5REx2cWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ0LCJhZHZTZWNyZXRLZXkiOiJ4NnRSOFN2RExDNDJVOGd1ZVRsZDZQVjBzTSszVmVjTUpBWWJhYzNRNDRZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMzk5Nzc2NjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjZCNTg5QzI5NkE4MUFGQzVDNjFGRjI4RkIyMEI5QTIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDI0MzU0MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTEzOTk3NzY2OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQzZEOEZCN0U2RDc3NzdBMTkxMzZERjA2Qzk3OTQ0QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI0MjQzNTQwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmeHBvYkpjTVFNaUN1UEFHdnVON1VnIiwicGhvbmVJZCI6IjY4YjQ0MzM2LWQ0NzktNGJiOS1hZmJlLTM1MTA3MzJlMTIxZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxbGJGckxYazVZc0RxQTQ4czFaQ1JYU3BnVjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjZUcnplQWI5VU12emNIRS91eXZYUlBQbytzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE4NkxQSkpMIiwibWUiOnsiaWQiOiIyMzQ5MTM5OTc3NjY4OjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiYXN0YWljaGl5dWtpbW9yaSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnZPcTRZR0VNTzhsN1lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUk13RzFqMGdjY1pUMVhSdDlJcVRodGdyOU5XK2t6ZU5XbllBaUliaXAwZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoia09XZjNRMDVXY054R1FQRENjRWtUQlZKVGE1eDlKcVVmY2Zud1NOZHl4bkNvclJ5Z1lpZFdkaWVjZlJGdUY4MDluWmtVbjVPSUtlNGNaRERZZVM4QUE9PSIsImRldmljZVNpZ25hdHVyZSI6ImJqMk4xODQweWlYTERIY1dyb2NFLzAyMEk1Q2w4RTBEdGlSV21uMk1yRmJMNy9tWmhpd0xOV21CbU9lSmwvMjNNNFliWlhRUTdNK1NLcmJ5MVkzSGdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTEzOTk3NzY2ODoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVUTUJ0WTlJSEhHVTlWMGJmU0trNGJZSy9UVnZwTTNqVnAyQUlpRzRxZEkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQyNDM1MzYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUEhuIn0==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
