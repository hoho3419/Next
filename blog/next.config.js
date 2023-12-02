/** @type {import('next').NextConfig} */

// const { } = require('next/constants') 여기서 npm run build 할때랑 npm run dev 할때 컴포넌트를 가져와서 식별한다

const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "ho12",
    mongodb_password: "968qQjp3Wa3rn1eu",
    mongodb_clustername: "cluster0",
    mongodb_database: "events"
  }
}

module.exports = nextConfig
////`mongodb+srv://ho12:968qQjp3Wa3rn1eu@cluster0.hsue17f.mongodb.net/events?retryWrites=true&w=majority`