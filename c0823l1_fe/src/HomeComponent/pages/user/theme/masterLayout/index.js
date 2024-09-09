import {memo, useState} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import HomePage from "../../homePage/homePage";


const MasterLayout = ({children, ...props}) => {
    const [search, setSearch] = useState();
    const [brand, setBrand] = useState();

    const handleSearch =  (s) => {
        setSearch(s);
    }
    const onBrandClick =  (s) => {
        setBrand(s)
        console.log(s)
    }


    return (
        <div {...props}>
            <Header handleSearch={handleSearch} onBrandClick={onBrandClick}/>
            {/*{children}*/}
            <HomePage search={search} brandS={brand}/>
            <Footer/>
        </div>
    )


}
export default memo(MasterLayout);