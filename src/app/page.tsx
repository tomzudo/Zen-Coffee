import Header from '@/components/home/header';
import Footer from '@/components/home/Footer';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-textMain">
      <Header />

      <section className="bg-[#F2F2E0] py-10">
        
        <div className="mx-auto max-w-7xl px-6">
          
          <h2 className="mb-12 text-4xl font-montserrat font-bold text-black text-center">
            CAFÉS MOÍDOS
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            <ProductCard
              name="Café Moído Caramelo"
              price={99.99}
              image="/cafe.jpg"
            />

            <ProductCard
              name="Café Moído Chocolate"
              price={110.99}
              image="/chocolate.jpg"
            />

            <ProductCard
              name="Café Moído Vanilla"
              price={130.99}
              image="/vanilla.jpg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}