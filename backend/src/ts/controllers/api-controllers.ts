import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { checkRateLimit } from "../middlewares/rate-limit";

export async function hello(
  event: HandlerEvent,
  context: HandlerContext,
  rateLimitInfo: BackendTypes.RateLimit
) {
  const rateLimit = await checkRateLimit(event, rateLimitInfo);
  if (rateLimit["statusCode"] !== 202) return rateLimit;

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
}
