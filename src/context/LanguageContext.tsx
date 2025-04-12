import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Language dictionary
const dictionary = {
  en: {
    // Navbar
    home: "Home",
    products: "Products",
    login: "Login",
    register: "Register",
    logout: "Logout",
    dashboard: "Dashboard",
    myProducts: "My Products",
    purchaseRequests: "Purchase Requests",
    language: "Language",
    // Removed duplicate 'browseProducts' property to resolve the error
    farmer: "Farmer",
    consumer: "Consumer",

    // Homepage
    heroTitle: "Fresh Produce",
    heroTitleSecond: "Directly From Farmers",
    heroSubtitle:
      "Connect with local farmers and enjoy fresh, seasonal produce delivered directly to you",
    browseProducts: "Browse Products",
    learnMore: "Learn More",
    featuredProducts: "Featured Products",
    viewAllProducts: "View All Products",
    whyChooseUs: "Why Choose Our Platform?",
    whyChooseUsSubtitle:
      "Connect directly with local farmers and enjoy fresh produce while supporting the local economy.",
    freshOrganic: "Fresh & Organic",
    freshOrganicDescription:
      "Access freshly harvested produce directly from farms, ensuring maximum nutrition and flavor.",
    supportLocalFarmers: "Support Local Farmers",
    supportLocalFarmersDescription:
      "Your purchases directly support local farmers and sustainable agricultural practices.",
    directDelivery: "Direct Delivery",
    directDeliveryDescription:
      "Arrange direct pickup or delivery with the farmer for the freshest possible products.",
    directCommunication: "Direct Communication",
    directCommunicationDescription:
      "Message farmers directly to learn more about their products and farming practices.",
    seasonalVariety: "Seasonal Variety",
    seasonalVarietyDescription:
      "Discover a wide variety of seasonal products that change throughout the year.",
    knowYourFood: "Know Your Food",
    knowYourFoodDescription:
      "Learn exactly where your food comes from and how it was grown or produced.",
    joinCommunity: "Join Our Farm-to-Consumer Community",
    joinCommunityDescription:
      "Whether you're a farmer looking to sell your products or a consumer seeking fresh, local produce - we've got you covered!",
    joinAsFarmer: "Join as a Farmer",
    joinAsConsumer: "Join as a Consumer",

    // Footer
    footerTagline:
      "Connecting farmers and consumers for fresher, more sustainable food systems.",
    forConsumers: "For Consumers",
    forFarmers: "For Farmers",
    contactUs: "Contact Us",
    howItWorks: "How It Works",
    // Removed duplicate 'createAccount' property to resolve the error
    faqs: "FAQs",
    sellYourProducts: "Sell Your Products",
    farmerDashboard: "Farmer Dashboard",
    successStories: "Success Stories",
    resources: "Resources",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    // Auth
    authHeroTitle: "Join Our Farming Community",
    authHeroDescription:
      "Connect with local consumers, sell your products directly, and grow your farm business with our platform.",
    authBenefit1: "Direct sales without middlemen",
    authBenefit2: "Build meaningful connections with consumers",
    authBenefit3: "Manage your products and sales easily",
    welcomeBack: "Welcome Back",
    loginToAccount: "Login to your account to continue",
    username: "Username",
    usernamePlaceholder: "Enter your username",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    passwordStrength:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email",
    emailPlaceholder: "Enter your email address",
    joinAs: "Join as",
    loggingIn: "Logging in...",
    noAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    creatingAccount: "Creating account...",
    loginRequired: "Login Required",
    loginToRequestProduct: "Please login as a consumer to request this product",

    // Form Validations
    usernameMin: "Username must be at least 3 characters",
    passwordMin: "Password must be at least 6 characters",
    nameMin: "Name must be at least 3 characters",
    emailInvalid: "Please enter a valid email address",
    roleRequired: "Please select a role",

    // Products
    allProducts: "All Products",
    productsFound: "products found",
    loading: "Loading",
    noProductsFound: "No products found matching your criteria",
    searchProducts: "Search products...",
    allCategories: "All Categories",
    vegetables: "Vegetables",
    fruits: "Fruits",
    dairy: "Dairy",
    meat: "Meat",
    poultry: "Poultry",
    bakery: "Bakery",
    specialty: "Specialty",
    sortBy: "Sort by",
    latest: "Latest",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    nameAZ: "Name: A-Z",
    nameZA: "Name: Z-A",
    filter: "Filter",
    requestToBuy: "Request to Buy",
    cannotBuyAsfarmer: "Cannot Buy as Farmer",
    switchToConsumerAccount:
      "Please switch to a consumer account to make purchases",

    // Product management
    manageProducts: "Manage Products",
    manageProductsDescription: "Add, edit, or remove your farm products",
    addProduct: "Add Product",
    addFirstProduct: "Add Your First Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete Product",
    productName: "Product Name",
    productNamePlaceholder: "Enter product name",
    productDescription: "Product Description",
    productDescriptionPlaceholder: "Describe your product",
    productPrice: "Price",
    productUnit: "Unit",
    productCategory: "Category",
    inStock: "In Stock",
    updateProduct: "Update Product",
    addNewProduct: "Add New Product",
    confirmDelete: "Confirm Delete",
    deleteProductConfirmation: "Are you sure you want to delete",
    thisActionCannot: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    edit: "Edit",
    back: "Back",
    actions: "Actions",
    status: "Status",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    price: "Price",
    category: "Category",

    // Product Form Validations
    productNameMin: "Product name must be at least 3 characters",
    productDescriptionMin: "Description must be at least 10 characters",
    productPricePositive: "Price must be a positive number",
    productUnitRequired: "Unit is required",
    productCategoryRequired: "Category is required",
    productAdded: "Product Added",
    productAddedSuccess: "Your product has been added successfully",
    productAddError: "Error Adding Product",
    productUpdated: "Product Updated",
    productUpdatedSuccess: "Your product has been updated successfully",
    productUpdateError: "Error Updating Product",
    productDeleted: "Product Deleted",
    productDeletedSuccess: "Your product has been deleted successfully",
    productDeleteError: "Error Deleting Product",

    // Product purchase
    quantity: "Quantity",
    messageToFarmer: "Message to Farmer (Optional)",
    messageToFarmerPlaceholder: "Any special requests or questions?",
    preferredDelivery: "Preferred Pickup/Delivery",
    selectDeliveryMethod: "Select delivery method",
    selectUnit: "Select unit",
    selectCategory: "Select category",
    farmPickup: "Farm Pickup",
    localMarketPickup: "Local Market Pickup",
    requestDelivery: "Request Delivery (Additional Fee)",
    sendRequest: "Send Request",
    requestSent: "Request Sent",
    requestSentDescription: "Your purchase request has been sent to the farmer",
    requestError: "Request Error",
    kilogram: "Kilogram",
    piece: "Piece",
    quantityPositive: "Quantity must be a positive number",
    deliveryMethodRequired: "Please select a delivery method",

    // Farmer dashboard
    farmerDashboard: "Farmer Dashboard",
    welcomeFarmer: "Welcome",
    totalProducts: "Total Products",
    pendingRequests: "Pending Requests",
    accountType: "Account Type",
    quickActions: "Quick Actions",
    recentProducts: "Recent Products",
    recentRequests: "Recent Requests",
    recentlyAddedProducts: "Recently Added Products",
    viewAll: "View All",
    noProductsYet: "No products added yet",
    recentPurchaseRequests: "Recent Purchase Requests",
    noPendingRequests: "No pending requests",
    requestIdShort: "Request",
    quantityValueUnit: "Quantity: {{quantity}} {{unit}}",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    requests: "Requests",

    // Purchase requests
    manageRequestsDescription:
      "Manage consumer purchase requests for your products",
    noRequestsYet: "No purchase requests yet",
    requestId: "Request ID",
    productDetails: "Product Details",
    deliveryMethod: "Delivery Method",
    date: "Date",
    actions: "Actions",
    viewDetails: "View Details",
    purchaseRequestDetails: "Purchase Request Details",
    requestIdLabel: "Request ID",
    consumerMessage: "Consumer Message",
    respondToConsumer: "Respond to Consumer",
    messageToConsumerPlaceholder: "Type your message to the consumer...",
    sendMessage: "Send Message",
    rejectRequest: "Reject Request",
    acceptRequest: "Accept Request",
    close: "Close",
    requestUpdated: "Request Updated",
    requestStatusUpdated: "Request status has been updated successfully",
    updateError: "Update Error",
    messageSent: "Message Sent",
    messageDelivered: "Your message has been delivered to the consumer",
    messageError: "Message Error",
    recently: "Recently",
    quantityValueUnit: "Quantity: {{quantity}}",
    confirmPassword: "Confirm password",
  },

  sq: {
    // Navbar
    home: "Kryefaqja",
    products: "Produktet",
    login: "Hyr",
    register: "Regjistrohu",
    logout: "Dil",
    dashboard: "Paneli",
    myProducts: "Produktet e Mia",
    purchaseRequests: "Kërkesat për Blerje",
    language: "Gjuha",
    browseProducts: "Shfleto Produktet",
    farmer: "Fermer",
    consumer: "Konsumator",

    // Homepage
    heroTitle: "Produkte të Freskëta",
    heroTitleSecond: "Direkt nga Fermerët",
    heroSubtitle:
      "Lidhu me fermerët vendas dhe shijoni produkte të freskëta sezonale të dorëzuara direkt tek ju",
    browseProducts: "Shfleto Produktet",
    learnMore: "Mëso më Shumë",
    featuredProducts: "Produktet e Zgjedhura",
    viewAllProducts: "Shiko Të Gjitha",
    whyChooseUs: "Pse të Zgjidhni Platformën Tonë?",
    whyChooseUsSubtitle:
      "Lidhuni drejtpërdrejt me fermerët vendas dhe shijoni produkte të freskëta duke mbështetur ekonominë lokale.",
    freshOrganic: "Të Freskëta & Organike",
    freshOrganicDescription:
      "Aksesoni produkte të korra së fundmi drejtpërdrejt nga fermat, duke siguruar ushqim me vlera maksimale dhe shije.",
    supportLocalFarmers: "Mbështet Fermerët Vendas",
    supportLocalFarmersDescription:
      "Blerjet tuaja mbështesin drejtpërdrejt fermerët vendas dhe praktikat bujqësore të qëndrueshme.",
    directDelivery: "Dorëzim i Drejtpërdrejtë",
    directDeliveryDescription:
      "Organizoni marrjen ose dorëzimin e drejtpërdrejtë me fermerin për produktet më të freskëta të mundshme.",
    directCommunication: "Komunikim i Drejtpërdrejtë",
    directCommunicationDescription:
      "Dërgoni mesazhe drejtpërdrejt fermerëve për të mësuar më shumë rreth produkteve dhe praktikave të tyre bujqësore.",
    seasonalVariety: "Varietet Sezonal",
    seasonalVarietyDescription:
      "Zbuloni një larmi të gjerë produktesh sezonale që ndryshojnë gjatë gjithë vitit.",
    knowYourFood: "Njihni Ushqimin Tuaj",
    knowYourFoodDescription:
      "Mësoni saktësisht se nga ku vjen ushqimi juaj dhe si është rritur apo prodhuar.",
    joinCommunity: "Bashkohuni me Komunitetin Tonë Fermer-Konsumator",
    joinCommunityDescription:
      "Nëse jeni fermer që dëshironi të shisni produktet tuaja ose konsumator që kërkoni produkte të freskëta dhe vendase - ne ju mbështesim!",
    joinAsFarmer: "Bashkohu si Fermer",
    joinAsConsumer: "Bashkohu si Konsumator",

    // Footer
    footerTagline:
      "Lidhja e fermerëve dhe konsumatorëve për sisteme ushqimore më të freskëta dhe të qëndrueshme.",
    forConsumers: "Për Konsumatorët",
    forFarmers: "Për Fermerët",
    contactUs: "Na Kontaktoni",
    howItWorks: "Si Funksionon",
    createAccount: "Krijo Llogari",
    faqs: "Pyetjet e Shpeshta",
    sellYourProducts: "Shitni Produktet Tuaja",
    farmerDashboard: "Paneli i Fermerit",
    successStories: "Histori Suksesi",
    resources: "Burime",
    allRightsReserved: "Të gjitha të drejtat e rezervuara.",
    privacyPolicy: "Politika e Privatësisë",
    termsOfService: "Kushtet e Shërbimit",

    // Auth
    authHeroTitle: "Bashkohuni me Komunitetin Tonë të Fermerëve",
    authHeroDescription:
      "Lidhuni me konsumatorët vendas, shisni produktet tuaja drejtpërdrejt dhe rritni biznesin tuaj bujqësor me platformën tonë.",
    authBenefit1: "Shitje direkte pa ndërmjetës",
    authBenefit2: "Ndërtoni lidhje kuptimplote me konsumatorët",
    authBenefit3: "Menaxhoni me lehtësi produktet dhe shitjet tuaja",
    welcomeBack: "Mirë se u kthyet",
    loginToAccount: "Hyni në llogarinë tuaj për të vazhduar",
    username: "Emri i përdoruesit",
    usernamePlaceholder: "Vendosni emrin e përdoruesit",
    password: "Fjalëkalimi",
    passwordPlaceholder: "Vendosni fjalëkalimin tuaj",
    fullName: "Emri i Plotë",
    fullNamePlaceholder: "Vendosni emrin e plotë",
    email: "Email",
    emailPlaceholder: "Vendosni adresën tuaj email",
    joinAs: "Regjistrohu si",
    loggingIn: "Duke hyrë...",
    noAccount: "Nuk keni llogari?",
    createAccount: "Krijo Llogari",
    alreadyHaveAccount: "Keni tashmë një llogari?",
    creatingAccount: "Duke krijuar llogari...",
    loginRequired: "Hyrja e Nevojshme",
    loginToRequestProduct:
      "Ju lutemi hyni si konsumator për të kërkuar këtë produkt",

    // Form Validations
    usernameMin: "Emri i përdoruesit duhet të ketë të paktën 3 karaktere",
    passwordMin: "Fjalëkalimi duhet të ketë të paktën 6 karaktere",
    nameMin: "Emri duhet të ketë të paktën 3 karaktere",
    emailInvalid: "Ju lutemi vendosni një adresë email të vlefshme",
    roleRequired: "Ju lutemi zgjidhni një rol",

    // Products
    allProducts: "Të Gjitha Produktet",
    productsFound: "produkte të gjetura",
    loading: "Duke u ngarkuar",
    noProductsFound: "Nuk u gjetën produkte që përputhen me kriteret tuaja",
    searchProducts: "Kërko produkte...",
    allCategories: "Të Gjitha Kategoritë",
    vegetables: "Perime",
    fruits: "Fruta",
    dairy: "Qumështore",
    meat: "Mish",
    poultry: "Shpendë",
    bakery: "Pastiçeri",
    specialty: "Specialitet",
    sortBy: "Rendit sipas",
    latest: "Më të Rejat",
    priceLowToHigh: "Çmimi: Ulët në të Lartë",
    priceHighToLow: "Çmimi: Lartë në të Ulët",
    nameAZ: "Emri: A-Z",
    nameZA: "Emri: Z-A",
    filter: "Filtro",
    requestToBuy: "Kërko për të Blerë",
    cannotBuyAsfarmer: "Nuk mund të blini si Fermer",
    switchToConsumerAccount:
      "Ju lutemi kaloni në një llogari konsumatori për të bërë blerje",

    // Product management
    manageProducts: "Menaxho Produktet",
    manageProductsDescription:
      "Shto, modifiko, ose hiq produktet e fermës tuaj",
    addProduct: "Shto Produkt",
    addFirstProduct: "Shto Produktin Tënd të Parë",
    editProduct: "Modifiko Produktin",
    deleteProduct: "Fshi Produktin",
    productName: "Emri i Produktit",
    productNamePlaceholder: "Vendosni emrin e produktit",
    productDescription: "Përshkrimi i Produktit",
    productDescriptionPlaceholder: "Përshkruaj produktin tënd",
    productPrice: "Çmimi",
    productUnit: "Njësia",
    productCategory: "Kategoria",
    inStock: "Në Stok",
    updateProduct: "Përditëso Produktin",
    addNewProduct: "Shto Produkt të Ri",
    confirmDelete: "Konfirmo Fshirjen",
    deleteProductConfirmation: "Jeni i sigurt që dëshironi të fshini",
    thisActionCannot: "Ky veprim nuk mund të kthehet.",
    cancel: "Anulo",
    delete: "Fshi",
    deleting: "Duke fshirë...",
    edit: "Modifiko",
    back: "Kthehu",
    actions: "Veprimet",
    status: "Statusi",
    inStock: "Në Stok",
    outOfStock: "Jo në Stok",
    price: "Çmimi",
    category: "Kategoria",

    // Product Form Validations
    productNameMin: "Emri i produktit duhet të ketë të paktën 3 karaktere",
    productDescriptionMin: "Përshkrimi duhet të ketë të paktën 10 karaktere",
    productPricePositive: "Çmimi duhet të jetë një numër pozitiv",
    productUnitRequired: "Njësia është e detyrueshme",
    productCategoryRequired: "Kategoria është e detyrueshme",
    productAdded: "Produkti u Shtua",
    productAddedSuccess: "Produkti juaj është shtuar me sukses",
    productAddError: "Gabim në Shtimin e Produktit",
    productUpdated: "Produkti u Përditësua",
    productUpdatedSuccess: "Produkti juaj është përditësuar me sukses",
    productUpdateError: "Gabim në Përditësimin e Produktit",
    productDeleted: "Produkti u Fshi",
    productDeletedSuccess: "Produkti juaj është fshirë me sukses",
    productDeleteError: "Gabim në Fshirjen e Produktit",

    // Product purchase
    quantity: "Sasia",
    messageToFarmer: "Mesazh për Fermerin (Opsionale)",
    messageToFarmerPlaceholder: "Kërkesa të veçanta ose pyetje?",
    preferredDelivery: "Mënyra e Preferuar e Marrjes/Dorëzimit",
    selectDeliveryMethod: "Zgjidhni mënyrën e dorëzimit",
    selectUnit: "Zgjidhni njësinë",
    selectCategory: "Zgjidhni kategorinë",
    farmPickup: "Marrje nga Ferma",
    localMarketPickup: "Marrje nga Tregu Lokal",
    requestDelivery: "Kërkesë për Dorëzim (Tarifë Shtesë)",
    sendRequest: "Dërgo Kërkesën",
    requestSent: "Kërkesa u Dërgua",
    requestSentDescription: "Kërkesa juaj për blerje i është dërguar fermerit",
    requestError: "Gabim në Kërkesë",
    kilogram: "Kilogram",
    piece: "Copë",
    dozen: "Dymbëdhjetëshe",
    liter: "Litër",
    bundle: "Tufë",
    jar: "Kavanoz",
    bag: "Qese",
    box: "Kuti",
    quantityPositive: "Sasia duhet të jetë një numër pozitiv",
    deliveryMethodRequired: "Ju lutemi zgjidhni një mënyrë dorëzimi",

    // Farmer dashboard
    farmerDashboard: "Paneli i Fermerit",
    welcomeFarmer: "Mirë se vini",
    totalProducts: "Totali i Produkteve",
    pendingRequests: "Kërkesat në Pritje",
    accountType: "Lloji i Llogarisë",
    quickActions: "Veprime të Shpejta",
    recentProducts: "Produktet e Fundit",
    recentRequests: "Kërkesat e Fundit",
    recentlyAddedProducts: "Produktet e Shtuara së Fundmi",
    viewAll: "Shiko Të Gjitha",
    noProductsYet: "Ende nuk janë shtuar produkte",
    recentPurchaseRequests: "Kërkesat e Fundit për Blerje",
    noPendingRequests: "Nuk ka kërkesa në pritje",
    requestIdShort: "Kërkesa",
    quantityValueUnit: "Sasia: {{quantity}} {{unit}}",
    pending: "Në Pritje",
    accepted: "Pranuar",
    rejected: "Refuzuar",
    requests: "Kërkesa",

    // Purchase requests
    manageRequestsDescription:
      "Menaxhoni kërkesat e konsumatorëve për blerje të produkteve tuaja",
    noRequestsYet: "Ende nuk ka kërkesa për blerje",
    requestId: "ID e Kërkesës",
    productDetails: "Detajet e Produktit",
    deliveryMethod: "Mënyra e Dorëzimit",
    date: "Data",
    actions: "Veprimet",
    viewDetails: "Shiko Detajet",
    purchaseRequestDetails: "Detajet e Kërkesës për Blerje",
    requestIdLabel: "ID e Kërkesës",
    consumerMessage: "Mesazhi i Konsumatorit",
    respondToConsumer: "Përgjigju Konsumatorit",
    messageToConsumerPlaceholder: "Shkruani mesazhin tuaj për konsumatorin...",
    sendMessage: "Dërgo Mesazhin",
    rejectRequest: "Refuzo Kërkesën",
    acceptRequest: "Prano Kërkesën",
    close: "Mbyll",
    requestUpdated: "Kërkesa u Përditësua",
    requestStatusUpdated: "Statusi i kërkesës është përditësuar me sukses",
    updateError: "Gabim në Përditësim",
    messageSent: "Mesazhi u Dërgua",
    messageDelivered: "Mesazhi juaj i është dorëzuar konsumatorit",
    messageError: "Gabim në Mesazh",
    recently: "Së Fundmi",
    quantityValueUnit: "Sasia: {{quantity}}",
    confirmPassword: "Konfirmo fjalëkalimin",
  },
};

// Type definitions
type SupportedLanguages = "en" | "sq";
type TranslationFunction = (
  key: string,
  params?: Record<string, string>
) => string;

interface LanguageContextType {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: TranslationFunction;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Get default language from localStorage or use English
  const getDefaultLanguage = (): SupportedLanguages => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as SupportedLanguages) || "en";
  };

  const [language, setLanguage] = useState<SupportedLanguages>(
    getDefaultLanguage()
  );

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
    // Optionally update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t: TranslationFunction = (key, params = {}) => {
    const currentDict = dictionary[language] || dictionary.en;
    let translation = currentDict[key as keyof typeof currentDict] || key;

    // Replace parameters in translation if needed
    if (params && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{{${paramKey}}}`, paramValue);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
