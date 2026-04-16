import Header from '@/components/home/header';
import Footer from '@/components/home/Footer';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-textMain">
      <Header />

      {/* PRODUTOS */}
      <section className="bg-[#F2F2E0] py-20">
        
        <div className="mx-auto max-w-7xl px-6">
          
          <h2 className="mb-12 text-6xl font-montserrat font-bold text-black text-center">
            Kits Oversized
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            <ProductCard
              name="Camiseta Azul"
              price={79.9}
              image="/camisa1.jpg"
            />

            <ProductCard
              name="Camiseta Preta"
              price={79.9}
              image="/camisa2.jpg"
            />

            <ProductCard
              name="Camiseta Rosa"
              price={79.9}
              image="/camisa3.jpg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}