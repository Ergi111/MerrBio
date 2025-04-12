import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product/ProductCard";
import { Link } from "wouter";
import { Leaf, Handshake, Truck, MessageCircle, Sprout, Heart } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  
  // Fetch featured products
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {t('heroTitle')} <br/> {t('heroTitleSecond')}
              </h1>
              <p className="text-lg mb-6 text-white/90">{t('heroSubtitle')}</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/products">
                  <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                    {t('browseProducts')}
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="bg-transparent hover:bg-white/10 border border-white text-white">
                  {t('learnMore')}
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1595506635416-cd66df435f07?auto=format&fit=crop&w=800&q=80" 
                alt="Fresh farm produce" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      {products && products.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">{t('featuredProducts')}</h2>
              <Link href="/products">
                <Button variant="link" className="text-primary">
                  {t('viewAllProducts')}
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">{t('whyChooseUs')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('whyChooseUsSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('freshOrganic')}</h3>
              <p className="text-gray-500">{t('freshOrganicDescription')}</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-amber-700/10 rounded-full flex items-center justify-center mb-4">
                <Handshake className="text-amber-700 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('supportLocalFarmers')}</h3>
              <p className="text-gray-500">{t('supportLocalFarmersDescription')}</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="text-amber-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('directDelivery')}</h3>
              <p className="text-gray-500">{t('directDeliveryDescription')}</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('directCommunication')}</h3>
              <p className="text-gray-500">{t('directCommunicationDescription')}</p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-amber-700/10 rounded-full flex items-center justify-center mb-4">
                <Sprout className="text-amber-700 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('seasonalVariety')}</h3>
              <p className="text-gray-500">{t('seasonalVarietyDescription')}</p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-amber-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('knowYourFood')}</h3>
              <p className="text-gray-500">{t('knowYourFoodDescription')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Section */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-amber-700/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('joinCommunity')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">{t('joinCommunityDescription')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-white/90">
                {t('joinAsFarmer')}
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                {t('joinAsConsumer')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
