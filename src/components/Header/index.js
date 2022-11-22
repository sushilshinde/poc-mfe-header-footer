import React, { useState } from "react";
import "./index.css";

function Header() {
    const [searchValue, setSearchValue] = useState("");
    const handleSearch = () => {
        const event = new CustomEvent('getSearchTerm', { detail: searchValue });
		window.dispatchEvent(event)
    };
    return (
        <header className="border border-light bg-info">
            <div className="input-group d-flex justify-content-center mt-4 mb-4">
                <div className="form-outline shadow-lg col-3">
                    <input
                        type="search"
                        id="form1"
                        className="form-control"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary col-1"
                    onClick={handleSearch}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </header>
    );
}

export default Header;
