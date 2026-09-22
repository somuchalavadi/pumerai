import logo from "../assets/pumerai-logo.png";

function LogoMark({ className = "", label = "Pumerai Hotel" }) {
  return <img className={`logo-mark ${className}`} src={logo} alt={label} />;
}

export default LogoMark;
