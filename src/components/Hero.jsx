import React from "react";
import hero from "./Img/Hero.png";
//
import Typography from "@material-ui/core/Typography";

export default function Hero() {
  return (
    <section className="hero">
      <img src={hero} alt="" />

      <div className="head">
        <Typography variant="h2" gutterBottom>
          Розклад аеропорт “Київ”
        </Typography>
      </div>
    </section>
  );
}
