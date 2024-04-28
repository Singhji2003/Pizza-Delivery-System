import app from "./app.js";
import connectToDB from "./db/index.js";
import dotenv from 'dotenv'
dotenv.config();
connectToDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("App is listening on PORT: ", process.env.PORT);
    })
}).catch((err) => { console.log("Something went wrong", err); })
