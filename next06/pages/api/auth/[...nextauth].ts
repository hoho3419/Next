import NextAuth from "next-auth/next";
import { getProviders } from "next-auth/react";
import Apple from "next-auth/providers/apple";
import auth from "next-auth/providers/auth0";

export default NextAuth({
  providers: [],
});
