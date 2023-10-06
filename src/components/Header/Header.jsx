import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [showText, setShowText] = useState(""); // Inicializa showText como una cadena vacía
  const text = "SNEAKERSWAP";

  useEffect(() => {
    const timeoutIDs = [];

    const writeText = () => {
      for (let i = 0; i < text.length; i++) {
        timeoutIDs.push(
          setTimeout(() => {
            setShowText((prevShowText) => prevShowText + text.charAt(i));
          }, i * 150)
        );
      }
    };

    const eraseText = () => {
      for (let i = text.length; i >= 0; i--) {
        timeoutIDs.push(
          setTimeout(() => {
            setShowText((prevShowText) => prevShowText.slice(0, -1));
          }, (text.length - i) * 150)
        );
      }
    };

    const startAnimation = () => {
      writeText();
      setTimeout(() => {
        eraseText();
      }, 60000); // Desaparece después de 1 minuto (60000 ms)
    };

    // Inicia la animación al cargar la página
    startAnimation();

    // Ciclo para reiniciar la animación después de 10 segundos
    const intervalID = setInterval(() => {
      startAnimation();
    }, 61000 + (text.length * 150)); // Reinicia después de 61 segundos + tiempo para borrar el texto

    // Borra todos los timeouts e intervalos al desmontar el componente
    return () => {
      timeoutIDs.forEach((timeoutID) => clearTimeout(timeoutID));
      clearInterval(intervalID);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo__container">
        <img src="./img/logo.png" alt="Logo" className="logo" />
        <h1 className="logo__title">
          <span className={`logo__char ${showText ? "animated-text" : ""}`}>
            {showText}
          </span>
        </h1>
      </div>
      <div className="menu">
        <nav className="nav-bar">
          <ul className="list">
            <li className="links">Home</li>
            <li className="links">Account</li>
            <li className="links">My purchases</li>
            <li className="links">My cart</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
