import minesticker from "../../assets/images/minesticker.png";
import { Box } from "@mui/material";
import "./Logo.scss";
const Logo = () => {
  return (
    <Box className="logo-container" style={{ marginBottom: "0px" }}>
      <img className="logo-image" src={minesticker} />
    </Box>
  );
};

export default Logo;
