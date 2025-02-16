const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEJnYWZ3NmxJTGJuREpmWE1qNW9NVjg0OGordEFXV3dQRjVMUzY4RFcyOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUW9FWjRhVUhrYmJDV2JLd1R6ZmtpYytteWJYbUwzSUVzNHNZaXpmanZEVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSlA2MlNROU9wQlZuWVVDTlJEdzZNU0NZOUFEa2lCa1cxQzNNZVlELzNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1Q3ZpZFZKaWVNcWQvd2U0R056U2c0SVFXL2lyN3RKelRNbG5CQTh6b1RzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlHR3FzOStDOE41TDhtMU10K1g1MnYwczRudHVnbVJ3QnhvR3laM3Iya289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImEra256UDRhbHp4YTFuNGRkRDZCbnZ1ZTdFTjdIYlpGWkhIVnE2SGJQamc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0ViZmdMdG94emhhaDAwUTMvK2x1eGExZ25ERHpIWDE3VFJ1dXJxRXVsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXBWcmRlNXkyRUFSWmxHSHRDVEQvT0syNHVobmcyYjhmSkIzOVk1cnAwVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZLcVNqdXZCTE1TUDN6dm9hNWVuS1dtNEppNzFVVUR5ZFk0RnVuZHhLWFgxVFpwN0hNSnJMSkNQUlJCbkxULzd4QngwRHJSa09tOWFzQ2E3WGZ6eWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiJaOHJ3U0QwaC9CTVlhK1FjeWFPOVI5MTdqUmV5cEdOelYwVktCOVBCbFA4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3NjBzb3JaNVNBYU1mZkhZTFpaV3RRIiwicGhvbmVJZCI6ImJiYTY0NDhkLTU0ODItNGQ4MC1hNWMyLTgwNTI4NDgzZmZiMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsUEZIeHhrSlJjYU5haC9MVW5VLzhEM25tUnM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZTZ5N2V6OGgzaW9MTkNyQVpxK2NHdUJUV05VPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNQRkEyUUc4IiwibWUiOnsiaWQiOiIxODI5NTU2OTczMjo3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuGtls2hzZzwnZCF8J2QkfCdkIDwnZCN8J2QgvCdkIfwnZCE8J2QkvCdkILwnZCA4Ly95LmI4Ly8In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKMlQyTTBDRUtTbXZiMEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJQTVzUVNRUkpUWUpsdTU2N3JRQ09LdDhSQUdLOWF0Mkt3UFVhS2ViYzEwPSIsImFjY291bnRTaWduYXR1cmUiOiJsUmVpZHI4YmJGdzY4ckRMb3krVDFOOENGV3ZVM1k0enN0NUsrZkpYZHZRZyttWmJTYWRlTitONnRpNlJCNmtKOEJZVFpiZWFZSUpYQXJobHJwb0lDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRk9WNHVLdk1UOE03OG15bHpScHhnOWdycDBKbndFQzZ5NVI0cStiWkZGWXRxb3V1TmEyUTdLc1NmNWRuOSs2cW5ZdEpwVGd4T3NScy8vZ0JTcHNoaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxODI5NTU2OTczMjo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNBT2JFRWtFU1UyQ1pidWV1NjBBamlyZkVRQml2V3JkaXNEMUdpbm0zTmQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzk1NDMzNDUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQkw5In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 18295569732",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
