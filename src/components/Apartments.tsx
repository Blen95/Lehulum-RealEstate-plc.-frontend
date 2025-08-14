import { Button, Card, Image, Text, Title, Container, Group, Box, Grid } from "@mantine/core";
import Apartmentcards from "./Apartmentcards";
import ViewSection from "./Viewsection";
import PerksSection from "./Perksection";

export default function Apartments() {
   return (
    <section id="apartments" className="py-16 bg-gray-50 min-h-screen">
           {/* Tagline */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-red-500 text-white px-8 py-3 rounded-full shadow-lg">
            <Title order={2} className="text-2xl font-extrabold tracking-wide">
              Luxury Living Beyond Walls – Your Dream Home, Plus Lifestyle Perks.
            </Title>
          </div>
        </div>
      <ViewSection/>
      <Apartmentcards/>
       <PerksSection/>
        
      </section>
      
  
    );
  }