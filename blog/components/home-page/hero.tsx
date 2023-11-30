import React from "react";
import classes from "./hero.module.css";
import Image from "next/legacy/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          alt="이철호"
          src={"/images/site/profile.jpg"}
          width={300}
          height={300}
          priority
        />
        이미지
      </div>
      <h1>안녕하세요 웹 개발자 이철호 입니다</h1>
      <p>
        제 개발 블로그에 오신걸 환영합니다! 주로 웹 개발에 대한 지식을 업로드
        하고 있습니다.
      </p>
    </section>
  );
};

export default Hero;
