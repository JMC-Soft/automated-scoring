import React from "react";
import Image from "next/image";
import inhaLogo from "$/images/logos/inha.png";
import skaLogo from "$/images/logos/ska.png";

function Header() {
  return (
    <section className="w-2/3 mx-auto justify-between flex border-t-2  border-black">
      <Image
        src={inhaLogo}
        height={100}
        style={{ objectFit: "contain" }}
        alt="인하대학교 로고"
      />
      <Image
        src={skaLogo}
        height={100}
        style={{ objectFit: "contain" }}
        alt="세종한국어학당 로고"
      />
    </section>
  );
}

export default Header;
