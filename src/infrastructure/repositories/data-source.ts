import mysql from "mysql2/promise";
import config from "config";


const configOptions = {
  host: config.get<string>("DATABASE.HOST"),
  user: config.get<string>("DATABASE.USER"),
  password: config.get<string>("DATABASE.PASSWORD"),
  database: config.get<string>("DATABASE.NAME"),
  port: config.get<number>("DATABASE.PORT"),
};
export const getPoolConnection = () => {
  const connection = mysql.createPool(configOptions);
  return connection;
};
