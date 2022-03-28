import mongoose from 'mongoose';
import app from './app';
import logger from './logger/logger';


mongoose.connect(process.env.CONNECTION_STRING || "", (err) => {
    if (err) {
        logger.error(err.message);
        return;
    }
    app.listen(process.env.PORT || 3000,()=>{
        logger.info("Server Satrted");
    });
});
