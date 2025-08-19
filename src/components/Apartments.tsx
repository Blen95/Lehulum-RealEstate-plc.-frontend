import { Title } from "@mantine/core";
import Apartmentcards from "./Apartmentcards";
import ViewSection from "./Viewsection";
import PerksSection from "./Perksection";

export default function Apartments() {
  return (
    <section
      id="apartments"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fefefe] min-h-screen py-20 px-6"
    >
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -right-32 w-[35rem] h-[35rem] bg-red-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 left-0 w-[25rem] h-[25rem] bg-rose-100 rounded-full opacity-10 blur-2xl" />
      </div>

      {/* Tagline */}
      <div className="relative z-10 mb-16 text-center">
        <div className="inline-block px-8 py-4 rounded-full shadow-lg bg-gradient-to-r from-[#B22234] to-[#FF6B6B]">
          <Title
            order={2}
            className="text-2xl font-extrabold tracking-wide text-white font-serif"
          >
            Luxury Living Beyond Walls – Your Dream Home, Plus Lifestyle Perks.
          </Title>
        </div>
      </div>

      {/* Sections */}
      {/* Sections */}
<div className="relative z-10 space-y-8">
  <ViewSection />
  <Apartmentcards />
  <PerksSection />
</div>

    </section>
  );
}
