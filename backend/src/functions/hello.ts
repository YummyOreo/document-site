import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { hello } from "../ts/controllers/api-controllers";
import * as RateLimits from "../ts/middlewares/rate-limit";

exports.handler = async (event: HandlerEvent, context: HandlerContext) => {
  return hello(event, context, RateLimits.helloRateLimit);
};
