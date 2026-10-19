import Hero from "./components/hero/Hero";
import Storytelling from "./components/story/Storytelling"; // <-- Importe o componente (ajuste o caminho da pasta conforme sua estrutura)
import Sobre from "./components/perfil/Sobre";
import Cards from "./components/cards/Cards";
import Banana from "./components/banana/Banana";
import Videos from "./components/carousel/Videos";
import Redes from "./components/redes/Redes";
import Feedback from "./components/feedback/Feedback";
import Qrcode from "./components/qrcode/Qrcode";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Hero />
      <Sobre />
      <Cards />
      <Banana />
      <Videos />
      <Storytelling />
      <Redes />
      <Feedback />
      <Qrcode />
      <Footer />
    </main>
  );
}