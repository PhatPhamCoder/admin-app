import React, { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";

export default function Search({ handleSearch }) {
  const [keySearch, setKeySearch] = useState("");

  const handleClickSearch = () => {
    handleSearch(keySearch.trim());
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <div className="d-flex align-items-center">
        <input
          type="text"
          placeholder="Tìm kiếm ....."
          value={keySearch}
          className="input-search form-control"
          onChange={(e) => setKeySearch(e.target.value)}
          onInput={(e) => {
            if (e.target.value.startsWith(" ")) {
              e.target.value = "";
            }
          }}
        />
      </div>

      <AiOutlineSearch
        size={30}
        onClick={() => handleClickSearch()}
        style={{ cursor: "pointer" }}
      />

      <div
        onClick={handleRefresh}
        style={{
          cursor: "pointer",
        }}
      >
        <TfiReload size={30} />
      </div>
    </div>
  );
}
