import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchData, setSearchData] = useState({
        keyword: '',
        results: [],
    });

    return (
        <SearchContext.Provider value={[searchData, setSearchData]}>
            {children}
        </SearchContext.Provider>
    );
}


//custom hooks
const useSearch = () => useContext(SearchContext)

export {useSearch, SearchProvider};