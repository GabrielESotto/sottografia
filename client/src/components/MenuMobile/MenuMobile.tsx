/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import "./MenuMobile.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";

const BasicMenu = () => {
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", fontWeight: "normal" }}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <a className="link_mobile" href="/" target="_blank">
          <MenuItem onClick={handleClose}>Visit my page</MenuItem>
        </a>
        <a className="link_mobile" href="/logged/admin/agenda">
          <MenuItem onClick={handleClose}>Agenda</MenuItem>
        </a>
        <a className="link_mobile" href="/logged/admin/photos">
          <MenuItem onClick={handleClose}>Fotos</MenuItem>
        </a>
        <a className="link_mobile" onClick={logout} href="/adminpage">
          <MenuItem onClick={handleClose}>Sair</MenuItem>
        </a>
      </Menu>
    </div>
  );
};

export default BasicMenu;
