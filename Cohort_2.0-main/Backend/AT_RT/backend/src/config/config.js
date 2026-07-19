import dotenv from "dotenv"
dotenv.config()



export const config = {
    mongoUri : process.env.MONGO_URI,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,

}