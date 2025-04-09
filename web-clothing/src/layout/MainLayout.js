import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from 'react-router-dom';

const MainLayout =()=>{
    return(
        <div>
            <Header/>
            <div>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
        
    );
};
export default MainLayout;