import { HandlerEvent } from "@netlify/functions";

const rateLimit = require("lambda-rate-limiter")({
  interval: 60 * 1000, // Our rate-limit interval, one minute
}).check;

export async function checkRateLimit(
  event: HandlerEvent,
  rateLimitInfo: BackendTypes.RateLimit
) {
  try {
    await rateLimit(rateLimitInfo.max, event.headers["client-ip"]);
    return { statusCode: 202 };
  } catch (error) {
    return {
      statusCode: 429,
      body: JSON.stringify({
        error:
          rateLimitInfo.message != undefined
            ? rateLimitInfo.message
            : "You are sending too many requests, please slow down",
      }),
    };
  }
}

export const helloRateLimit: BackendTypes.RateLimit = {
  max: 1,
};
