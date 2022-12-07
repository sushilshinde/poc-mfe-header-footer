import React, { useState } from "react";
import "./index.css";

/**
 * Header With Searchbar
 *
 * @description: Shows a header component with a search bar to input a github username
 * @returns Header Component
 */
function Header() {
    const [searchValue, setSearchValue] = useState("");
    const handleSearch = () => {
        const event = new CustomEvent('getSearchTerm', { detail: searchValue.trim() });
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
                        placeholder="Github Username"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary col-1"
                    onClick={handleSearch}
                    disabled={searchValue.trim().length === 0}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </header>
    );
}

export default Header;
