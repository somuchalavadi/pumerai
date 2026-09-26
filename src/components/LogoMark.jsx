import logo from "../assets/pumerai-logo.png";

function LogoMark({ className = "", label = "Pumerai Hotel", src = logo }) {
  return <img className={`logo-mark ${className}`} src={src} alt={label} />;
}

export default LogoMark;
