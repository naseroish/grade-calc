import '../App.css'
import Footer from '../components/Footer';
import HomeNav from '../components/HomeNav';
import Stat from '../components/stat';


export default function Home() {
    return (
        <div className='page-container'>
            <HomeNav />
            <div className='content-container flex items-center justify-center bg-neutral p-10'>
                <Stat />
            </div>
            <Footer />
        </div>
    );
}