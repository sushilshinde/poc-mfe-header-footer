import React from "react";
import "./index.css";

function Header() {
  return (
    <header className="border border-light bg-info">
      <div className="input-group d-flex justify-content-center mt-4 mb-4">
        <div className="form-outline shadow-lg col-3">
          <input type="search" id="form1" className="form-control" />
        </div>
        <button type="button" className="btn btn-primary col-1">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
