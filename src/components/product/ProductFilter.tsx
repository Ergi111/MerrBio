import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

interface ProductFiltersProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
}

export function ProductFilter({ onSearch, onCategoryChange, onSortChange }: ProductFiltersProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div className="mb-8 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Button 
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="w-full sm:w-auto">
            <Select onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allCategories')}</SelectItem>
                <SelectItem value="Vegetables">{t('vegetables')}</SelectItem>
                <SelectItem value="Fruits">{t('fruits')}</SelectItem>
                <SelectItem value="Dairy">{t('dairy')}</SelectItem>
                <SelectItem value="Meat">{t('meat')}</SelectItem>
                <SelectItem value="Poultry">{t('poultry')}</SelectItem>
                <SelectItem value="Bakery">{t('bakery')}</SelectItem>
                <SelectItem value="Specialty">{t('specialty')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-auto">
            <Select onValueChange={onSortChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">{t('latest')}</SelectItem>
                <SelectItem value="price_low">{t('priceLowToHigh')}</SelectItem>
                <SelectItem value="price_high">{t('priceHighToLow')}</SelectItem>
                <SelectItem value="name_asc">{t('nameAZ')}</SelectItem>
                <SelectItem value="name_desc">{t('nameZA')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
        </div>
      </div>
    </div>
  );
}
