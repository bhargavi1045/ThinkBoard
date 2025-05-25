import ratelimit from "../config/upstash.js";

const rateLimiter= async (req,resizeBy,next) =>{
  try{
    const {success}=await ratelimit.limit("my-limit-key");
    if(!success){
        return res.status(429).json({
          message: "Too many requests, please try again later."
        });
    }
    next();
  }catch(error){
    console.log("rate limiter error",error);
    next(error);
  }
}

export default rateLimiter;