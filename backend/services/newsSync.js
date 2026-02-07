import axios from "axios";
import News from "../models/News.js";

   const query ='ayurveda AND health AND wellness AND medicine';


const NEWS_API_KEY = "2c7b210c3e674b9fa65a13bc1be8c36b";

export const syncNews = async () => {
  try {
    console.log("syncNews started");

    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: query,
          language: "en",
          sortBy: "publishedAt",
          pageSize: 100,
          excludeDomains:
            "espn.com,bbc.com,cnn.com,ndtv.com,indiatoday.in",
          apiKey: NEWS_API_KEY,
        },
      }
    );

    if (response.data.status !== "ok") {
      throw new Error(response.data.message || "News API error");
    }

    const articles = response.data.articles || [];
    console.log("Articles fetched:", articles.length);

    if (!articles.length) {
      console.log("No articles found for query");
      return;
    }

    for (const article of articles) {
      if (!article.url) continue;

      try {
        await News.updateOne(
          { url: article.url }, 
          {
            title: article.title,
            description: article.description,
            content: article.content,
            source: article.source?.name,
            url: article.url,
            imageUrl: article.urlToImage,
            publishedAt: article.publishedAt,
          },
          { upsert: true }
        );
      } catch (dbError) {
        console.error("Error saving article:", article.url, dbError.message);
      }
    }

    console.log("News sync completed");
  } catch (error) {
    console.error("syncNews failed:", error.message);
  }
};
