import Navbar from './components/Navbar';
import  {HeroSection}  from './components/Hero';
import '@mantine/core/styles.css';
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import './index.css';
import HomePage from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewsDetail from './pages/newsdetail';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
    <MantineProvider
          theme={{}}
          defaultColorScheme="light"
        >
<Navbar/>
      <HomePage />  
    <Footer/>
        </MantineProvider>
    
      

      </>
  );
}

