import '../App.css'
import Footer from '../components/Footer';
import HomeNav from '../components/HomeNav';
import Stat from '../components/stat';
import Grades from '../components/grades';


export default function Home() {
    return (
        <div className='flex-1 max-h-full overflow-hidden overflow-y-scroll'>
            <HomeNav />
            <div className='content-container flex items-center justify-center bg-neutral p-10'>
                <Stat />
                <Grades />
                
            </div>
            <Footer />
        </div>
    );
}