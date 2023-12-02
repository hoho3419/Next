import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>문의 페이지</title>
        <meta name="description" content="궁금한것이 있으면 연락 주세요!" />
      </Head>
      <ContactForm />;
    </>
  );
};

export default ContactPage;
