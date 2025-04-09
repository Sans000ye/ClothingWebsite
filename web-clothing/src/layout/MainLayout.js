import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from 'react-router-dom';

const MainLayout =()=>{
    return(
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex flex-1">
                <main className="flex-1 p-4">
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
        
    );
};
export default MainLayout;