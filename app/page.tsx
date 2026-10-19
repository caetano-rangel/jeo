import Hero from "./components/hero/Hero"; // Ajuste o caminho da pasta onde salvou o Hero
import Sobre from "./components/perfil/Sobre";
import Cards from "./components/cards/Cards";
import Videos from "./components/carousel/Videos";
import Redes from "./components/redes/Redes";
import Feedback from "./components/feedback/Feedback";
import Footer from "./components/footer/Footer";
import Qrcode from "./components/qrcode/Qrcode";
import Banana from "./components/banana/Banana";

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Hero />
      <Sobre />
      <Cards />
      <Banana />
      <Videos />
      <Redes />
      <Feedback />
      <Qrcode />
      <Footer />
    </main>
  );
}