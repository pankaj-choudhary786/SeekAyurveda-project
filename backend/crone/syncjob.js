import cron from "node-cron";
import { syncNews } from "../services/newsSync.js";

export const startNewsCron = () => {
  cron.schedule("*/2 * * * *", async () => {
    console.log("Cron job triggered");
    await syncNews();
  });
};
