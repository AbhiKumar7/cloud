import { app } from "./app.js";
import { connectToDb } from "./dataBase/db.js";

connectToDb().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("prot running at", process.env.PORT);
  });
}).catch((error) =>{
    console.log("connect error",error);
    
});
