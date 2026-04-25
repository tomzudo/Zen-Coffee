import Header from '@/components/home/header';
import Footer from '@/components/home/Footer';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-textMain">
      <Header />

      <section className="bg-[#F2F2E0] py-10">
        
        <div className="mx-auto max-w-70xl px-6">
          
          <h2 className="mb-12 text-4xl font-montserrat font-bold text-black text-center">
            CAFÉS MOÍDOS
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

            <ProductCard
              name="Café Moído Caramelo"
              price={99.99}
              image="/cafe.jpg" 
              id={'cmobu896t0004vt94mhfkjpgz'}            />

            <ProductCard
              name="Café Moído Chocolate"
              price={110.99}
              image="/chocolate.jpg"
              id={'cmodkqz2b0002vt8wf00t9t3a'}
            />

            <ProductCard
              name="Café Moído Vanilla"
              price={130.99}
              image="/vanilla.jpg"
              id={'cmodktvp30003vt8wdtbrsxqn'}
            />

            <ProductCard
              name="Café Moído Amêndoas"
              price={120.99}
              image="/vanilla.jpg"
              id={'cmodkujyo0004vt8wbml74ma1'}
            />

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 