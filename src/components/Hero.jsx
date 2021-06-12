import React from "react";
import hero from "./Img/Hero.png";
//
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

export default function Hero() {
  const classes = useStyles();

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
