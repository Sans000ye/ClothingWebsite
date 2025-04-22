// Home.js
import Banner from "../components/Banner/Banner";
import NewArrivals from "../components/Interest/Interest";
import TopSelling from "../components/TopSelling/TopSelling";
import DressStyle from "../components/DressStyle/DressStyle";
import Evaluate from "../components/Evaluate/Evaluate";
const Home = () => {
    return(
         <div>
            <Banner/>
            <NewArrivals/>
            <TopSelling/>
            <DressStyle/>
            <Evaluate/>
         </div>
    );
};
export default Home;
