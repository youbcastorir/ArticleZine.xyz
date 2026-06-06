// ArticleZine.xyz — Product Catalog
// Print On Demand Morocco

const WHATSAPP_NUMBER = "212602321305";

// Color palette for products
const COLORS = {
  black: { ar: "أسود", fr: "Noir", en: "Black", hex: "#1a1a1a" },
  white: { ar: "أبيض", fr: "Blanc", en: "White", hex: "#ffffff" },
  navy: { ar: "كحلي", fr: "Marine", en: "Navy", hex: "#1e3a5f" },
  red: { ar: "أحمر", fr: "Rouge", en: "Red", hex: "#c0392b" },
  gray: { ar: "رمادي", fr: "Gris", en: "Gray", hex: "#6b7280" },
  green: { ar: "أخضر", fr: "Vert", en: "Green", hex: "#166534" },
  burgundy: { ar: "عنابي", fr: "Bordeaux", en: "Burgundy", hex: "#6d1f2f" },
  orange: { ar: "برتقالي", fr: "Orange", en: "Orange", hex: "#ea580c" },
  yellow: { ar: "أصفر", fr: "Jaune", en: "Yellow", hex: "#ca8a04" },
  blue: { ar: "أزرق", fr: "Bleu", en: "Blue", hex: "#1d4ed8" },
  pink: { ar: "وردي", fr: "Rose", en: "Pink", hex: "#db2777" },
  purple: { ar: "بنفسجي", fr: "Violet", en: "Purple", hex: "#7c3aed" },
  camel: { ar: "جملي", fr: "Camel", en: "Camel", hex: "#c09060" },
  olive: { ar: "زيتوني", fr: "Olive", en: "Olive", hex: "#6b7c3a" },
};

const SIZES_ADULT = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const SIZES_KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"];
const SIZES_BABY = ["0-6M", "6-12M", "12-18M", "18-24M", "2-3Y"];
const SIZES_ONE = ["Unique"];

// Unsplash image collections for apparel (royalty-free)
const IMG = {
  men_tshirt: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
  ],
  men_polo: [
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
  ],
  men_hoodie: [
    "https://images.unsplash.com/photo-1556821840-3a63f15232d0?w=600&q=80",
    "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&q=80",
    "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&q=80",
  ],
  men_sweat: [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80",
  ],
  men_jacket: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    "https://images.unsplash.com/photo-1548712020-869af2ec6e6e?w=600&q=80",
  ],
  men_sport: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
  ],
  women_tshirt: [
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80",
    "https://images.unsplash.com/photo-1503342564462-f51a7fe1e695?w=600&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
  ],
  women_hoodie: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&q=80",
  ],
  women_dress: [
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  ],
  women_sweat: [
    "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
  ],
  women_sport: [
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80",
  ],
  kids_tshirt: [
    "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
    "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
  ],
  kids_hoodie: [
    "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
  ],
  kids_school: [
    "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80",
  ],
  kids_baby: [
    "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
  ],
  cap: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
  ],
  tote: [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80",
  ],
  mug: [
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=600&q=80",
  ],
  phonecase: [
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    "https://images.unsplash.com/photo-1592345549099-5e5cdb7e5cf6?w=600&q=80",
  ],
  sticker: [
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  ],
};

function makeDesc(lang) {
  const descs = {
    ar: "تصميم عصري مطبوع بجودة عالية على قماش مريح. ألوان ثابتة تتحمل الغسيل. متاح بعدة مقاسات وألوان. توصيل لجميع مدن المغرب.",
    fr: "Design moderne imprimé haute qualité sur tissu confortable. Couleurs durables résistantes au lavage. Disponible en plusieurs tailles et couleurs. Livraison partout au Maroc.",
    en: "Modern design printed in high quality on comfortable fabric. Long-lasting colors that withstand washing. Available in multiple sizes and colors. Delivery across Morocco.",
  };
  return descs[lang] || descs.en;
}

// Generate product list
const PRODUCTS = [
  // ── MEN ──────────────────────────────────────────────────────────
  { id: "m-ts-1", category: "men", sub: "tshirts", name: { ar: "تيشرت جرافيك أسود", fr: "T-shirt Graphic Noir", en: "Black Graphic T-Shirt" }, price: 149, colors: ["black","white","navy","gray"], sizes: SIZES_ADULT, images: IMG.men_tshirt, trending: true, isNew: false, desc: makeDesc },
  { id: "m-ts-2", category: "men", sub: "tshirts", name: { ar: "تيشرت كلاسيك أبيض", fr: "T-shirt Classic Blanc", en: "White Classic T-Shirt" }, price: 129, colors: ["white","black","gray","navy"], sizes: SIZES_ADULT, images: IMG.men_tshirt, trending: false, isNew: true, desc: makeDesc },
  { id: "m-ts-3", category: "men", sub: "tshirts", name: { ar: "تيشرت ستريتوير", fr: "T-shirt Streetwear", en: "Streetwear T-Shirt" }, price: 159, colors: ["black","burgundy","olive"], sizes: SIZES_ADULT, images: IMG.men_tshirt, trending: true, isNew: true, desc: makeDesc },
  { id: "m-ts-4", category: "men", sub: "tshirts", name: { ar: "تيشرت مطبوع قطن", fr: "T-shirt Coton Imprimé", en: "Printed Cotton T-Shirt" }, price: 139, colors: ["white","blue","green","red"], sizes: SIZES_ADULT, images: IMG.men_tshirt, trending: false, isNew: false, desc: makeDesc },

  { id: "m-po-1", category: "men", sub: "polo", name: { ar: "بولو كلاسيك", fr: "Polo Classic", en: "Classic Polo" }, price: 199, colors: ["navy","white","black","red"], sizes: SIZES_ADULT, images: IMG.men_polo, trending: false, isNew: false, desc: makeDesc },
  { id: "m-po-2", category: "men", sub: "polo", name: { ar: "بولو بيزنس", fr: "Polo Business", en: "Business Polo" }, price: 219, colors: ["navy","black","gray"], sizes: SIZES_ADULT, images: IMG.men_polo, trending: true, isNew: false, desc: makeDesc },
  { id: "m-po-3", category: "men", sub: "polo", name: { ar: "بولو رياضي", fr: "Polo Sport", en: "Sport Polo" }, price: 189, colors: ["white","red","blue","black"], sizes: SIZES_ADULT, images: IMG.men_polo, trending: false, isNew: true, desc: makeDesc },

  { id: "m-ho-1", category: "men", sub: "hoodies", name: { ar: "هودي أسود مطبوع", fr: "Hoodie Noir Imprimé", en: "Black Printed Hoodie" }, price: 299, colors: ["black","gray","navy"], sizes: SIZES_ADULT, images: IMG.men_hoodie, trending: true, isNew: false, desc: makeDesc },
  { id: "m-ho-2", category: "men", sub: "hoodies", name: { ar: "هودي قطن دافئ", fr: "Hoodie Coton Chaud", en: "Warm Cotton Hoodie" }, price: 279, colors: ["gray","black","burgundy","olive"], sizes: SIZES_ADULT, images: IMG.men_hoodie, trending: false, isNew: false, desc: makeDesc },
  { id: "m-ho-3", category: "men", sub: "hoodies", name: { ar: "هودي ستريت أرت", fr: "Hoodie Street Art", en: "Street Art Hoodie" }, price: 319, colors: ["black","navy","green"], sizes: SIZES_ADULT, images: IMG.men_hoodie, trending: true, isNew: true, desc: makeDesc },

  { id: "m-sw-1", category: "men", sub: "sweatshirts", name: { ar: "سويتشيرت بطبعة لوغو", fr: "Sweatshirt Logo", en: "Logo Sweatshirt" }, price: 249, colors: ["gray","navy","black","white"], sizes: SIZES_ADULT, images: IMG.men_sweat, trending: false, isNew: false, desc: makeDesc },
  { id: "m-sw-2", category: "men", sub: "sweatshirts", name: { ar: "سويتشيرت مطرز", fr: "Sweatshirt Brodé", en: "Embroidered Sweatshirt" }, price: 269, colors: ["navy","burgundy","black"], sizes: SIZES_ADULT, images: IMG.men_sweat, trending: true, isNew: true, desc: makeDesc },

  { id: "m-ja-1", category: "men", sub: "jackets", name: { ar: "جاكيت بومبر مطبوع", fr: "Veste Bomber Imprimé", en: "Printed Bomber Jacket" }, price: 499, colors: ["black","navy","olive"], sizes: SIZES_ADULT, images: IMG.men_jacket, trending: true, isNew: false, desc: makeDesc },
  { id: "m-ja-2", category: "men", sub: "jackets", name: { ar: "جاكيت هارينغتون", fr: "Veste Harrington", en: "Harrington Jacket" }, price: 459, colors: ["navy","camel","black"], sizes: SIZES_ADULT, images: IMG.men_jacket, trending: false, isNew: true, desc: makeDesc },

  { id: "m-sp-1", category: "men", sub: "sportswear", name: { ar: "تيشرت رياضي مطبوع", fr: "T-shirt Sport Imprimé", en: "Printed Sport T-Shirt" }, price: 169, colors: ["black","navy","red","white"], sizes: SIZES_ADULT, images: IMG.men_sport, trending: false, isNew: false, desc: makeDesc },
  { id: "m-sp-2", category: "men", sub: "sportswear", name: { ar: "طقم رياضي مطبوع", fr: "Ensemble Sport Imprimé", en: "Printed Sport Set" }, price: 349, colors: ["black","navy","red"], sizes: SIZES_ADULT, images: IMG.men_sport, trending: true, isNew: false, desc: makeDesc },

  // ── WOMEN ──────────────────────────────────────────────────────
  { id: "w-ts-1", category: "women", sub: "tshirts", name: { ar: "تيشرت نسائي ووف", fr: "T-shirt Femme Waf", en: "Women's Waf T-Shirt" }, price: 139, colors: ["white","pink","black","blue"], sizes: SIZES_ADULT, images: IMG.women_tshirt, trending: true, isNew: false, desc: makeDesc },
  { id: "w-ts-2", category: "women", sub: "tshirts", name: { ar: "تيشرت نسائي كروب", fr: "T-shirt Femme Crop", en: "Women's Crop T-Shirt" }, price: 129, colors: ["white","black","pink","yellow"], sizes: SIZES_ADULT, images: IMG.women_tshirt, trending: false, isNew: true, desc: makeDesc },
  { id: "w-ts-3", category: "women", sub: "tshirts", name: { ar: "تيشرت نسائي كلاسيك", fr: "T-shirt Femme Classic", en: "Women's Classic T-Shirt" }, price: 119, colors: ["white","black","navy","gray","pink"], sizes: SIZES_ADULT, images: IMG.women_tshirt, trending: false, isNew: false, desc: makeDesc },

  { id: "w-ho-1", category: "women", sub: "hoodies", name: { ar: "هودي نسائي بطبعة", fr: "Hoodie Femme Imprimé", en: "Women's Printed Hoodie" }, price: 289, colors: ["pink","gray","black","white"], sizes: SIZES_ADULT, images: IMG.women_hoodie, trending: true, isNew: false, desc: makeDesc },
  { id: "w-ho-2", category: "women", sub: "hoodies", name: { ar: "هودي نسائي أوفرسايز", fr: "Hoodie Femme Oversize", en: "Women's Oversized Hoodie" }, price: 309, colors: ["gray","black","purple","white"], sizes: SIZES_ADULT, images: IMG.women_hoodie, trending: true, isNew: true, desc: makeDesc },

  { id: "w-dr-1", category: "women", sub: "dresses", name: { ar: "فستان مطبوع صيفي", fr: "Robe Imprimée Été", en: "Printed Summer Dress" }, price: 299, colors: ["white","pink","blue","yellow"], sizes: SIZES_ADULT, images: IMG.women_dress, trending: true, isNew: false, desc: makeDesc },
  { id: "w-dr-2", category: "women", sub: "dresses", name: { ar: "فستان كاجوال مطبوع", fr: "Robe Casual Imprimée", en: "Casual Printed Dress" }, price: 329, colors: ["black","navy","red","green"], sizes: SIZES_ADULT, images: IMG.women_dress, trending: false, isNew: true, desc: makeDesc },

  { id: "w-sw-1", category: "women", sub: "sweatshirts", name: { ar: "سويتشيرت نسائي ناعم", fr: "Sweat Femme Doux", en: "Women's Soft Sweatshirt" }, price: 239, colors: ["pink","gray","white","purple"], sizes: SIZES_ADULT, images: IMG.women_sweat, trending: false, isNew: false, desc: makeDesc },
  { id: "w-sw-2", category: "women", sub: "sweatshirts", name: { ar: "سويتشيرت كروب نسائي", fr: "Sweat Crop Femme", en: "Women's Crop Sweatshirt" }, price: 219, colors: ["white","pink","yellow","black"], sizes: SIZES_ADULT, images: IMG.women_sweat, trending: true, isNew: true, desc: makeDesc },

  { id: "w-sp-1", category: "women", sub: "sportswear", name: { ar: "ليغنز رياضي مطبوع", fr: "Legging Sport Imprimé", en: "Printed Sport Leggings" }, price: 189, colors: ["black","navy","gray"], sizes: SIZES_ADULT, images: IMG.women_sport, trending: true, isNew: false, desc: makeDesc },
  { id: "w-sp-2", category: "women", sub: "sportswear", name: { ar: "تيشرت رياضي نسائي", fr: "T-shirt Sport Femme", en: "Women's Sport T-Shirt" }, price: 159, colors: ["black","white","pink","blue"], sizes: SIZES_ADULT, images: IMG.women_sport, trending: false, isNew: false, desc: makeDesc },

  // ── KIDS ──────────────────────────────────────────────────────
  { id: "k-ts-1", category: "kids", sub: "tshirts", name: { ar: "تيشرت أطفال كارتون", fr: "T-shirt Enfant Cartoon", en: "Kids Cartoon T-Shirt" }, price: 99, colors: ["white","yellow","blue","pink"], sizes: SIZES_KIDS, images: IMG.kids_tshirt, trending: true, isNew: false, desc: makeDesc },
  { id: "k-ts-2", category: "kids", sub: "tshirts", name: { ar: "تيشرت أطفال مطبوع", fr: "T-shirt Enfant Imprimé", en: "Kids Printed T-Shirt" }, price: 89, colors: ["white","black","navy","red"], sizes: SIZES_KIDS, images: IMG.kids_tshirt, trending: false, isNew: true, desc: makeDesc },
  { id: "k-ts-3", category: "kids", sub: "tshirts", name: { ar: "تيشرت أطفال رياضي", fr: "T-shirt Enfant Sport", en: "Kids Sport T-Shirt" }, price: 109, colors: ["white","red","navy","black"], sizes: SIZES_KIDS, images: IMG.kids_tshirt, trending: false, isNew: false, desc: makeDesc },

  { id: "k-ho-1", category: "kids", sub: "hoodies", name: { ar: "هودي أطفال دافئ", fr: "Hoodie Enfant Chaud", en: "Kids Warm Hoodie" }, price: 199, colors: ["gray","navy","black","pink"], sizes: SIZES_KIDS, images: IMG.kids_hoodie, trending: true, isNew: false, desc: makeDesc },
  { id: "k-ho-2", category: "kids", sub: "hoodies", name: { ar: "هودي أطفال مطبوع", fr: "Hoodie Enfant Imprimé", en: "Kids Printed Hoodie" }, price: 219, colors: ["black","burgundy","navy"], sizes: SIZES_KIDS, images: IMG.kids_hoodie, trending: false, isNew: true, desc: makeDesc },

  { id: "k-sc-1", category: "kids", sub: "school", name: { ar: "قميص مدرسي موحد", fr: "Chemise Scolaire", en: "School Uniform Shirt" }, price: 149, colors: ["white","navy","gray"], sizes: SIZES_KIDS, images: IMG.kids_school, trending: false, isNew: false, desc: makeDesc },
  { id: "k-sc-2", category: "kids", sub: "school", name: { ar: "جاكيت مدرسي موحد", fr: "Veste Scolaire", en: "School Jacket" }, price: 249, colors: ["navy","black","gray"], sizes: SIZES_KIDS, images: IMG.kids_school, trending: true, isNew: false, desc: makeDesc },
  { id: "k-sc-3", category: "kids", sub: "school", name: { ar: "هودي مدرسي موحد", fr: "Hoodie Scolaire", en: "School Hoodie" }, price: 199, colors: ["navy","black","burgundy","green"], sizes: SIZES_KIDS, images: IMG.kids_school, trending: false, isNew: true, desc: makeDesc },

  { id: "k-ba-1", category: "kids", sub: "baby", name: { ar: "بادي أطفال صغار", fr: "Body Bébé", en: "Baby Bodysuit" }, price: 79, colors: ["white","pink","blue","yellow"], sizes: SIZES_BABY, images: IMG.kids_baby, trending: true, isNew: false, desc: makeDesc },
  { id: "k-ba-2", category: "kids", sub: "baby", name: { ar: "تيشرت رضيع مطبوع", fr: "T-shirt Bébé Imprimé", en: "Printed Baby T-Shirt" }, price: 89, colors: ["white","yellow","pink","blue"], sizes: SIZES_BABY, images: IMG.kids_baby, trending: false, isNew: true, desc: makeDesc },

  // ── ACCESSORIES ───────────────────────────────────────────────
  { id: "a-ca-1", category: "accessories", sub: "caps", name: { ar: "كاب مطبوع كلاسيك", fr: "Casquette Classic", en: "Classic Printed Cap" }, price: 99, colors: ["black","navy","white","red"], sizes: SIZES_ONE, images: IMG.cap, trending: true, isNew: false, desc: makeDesc },
  { id: "a-ca-2", category: "accessories", sub: "caps", name: { ar: "كاب ستريت أرت", fr: "Casquette Street Art", en: "Street Art Cap" }, price: 119, colors: ["black","gray","camel"], sizes: SIZES_ONE, images: IMG.cap, trending: false, isNew: true, desc: makeDesc },
  { id: "a-ca-3", category: "accessories", sub: "caps", name: { ar: "كاب رياضي مطرز", fr: "Casquette Sport Brodée", en: "Embroidered Sport Cap" }, price: 129, colors: ["navy","black","white"], sizes: SIZES_ONE, images: IMG.cap, trending: true, isNew: false, desc: makeDesc },

  { id: "a-to-1", category: "accessories", sub: "totebags", name: { ar: "حقيبة كانفاس مطبوعة", fr: "Tote Bag Canvas Imprimé", en: "Printed Canvas Tote Bag" }, price: 79, colors: ["white","black","navy"], sizes: SIZES_ONE, images: IMG.tote, trending: true, isNew: false, desc: makeDesc },
  { id: "a-to-2", category: "accessories", sub: "totebags", name: { ar: "حقيبة يد مطبوعة كبيرة", fr: "Grand Tote Bag Imprimé", en: "Large Printed Tote Bag" }, price: 99, colors: ["white","black","camel"], sizes: SIZES_ONE, images: IMG.tote, trending: false, isNew: true, desc: makeDesc },

  { id: "a-mu-1", category: "accessories", sub: "mugs", name: { ar: "كوب مطبوع كلاسيك", fr: "Mug Classique Imprimé", en: "Classic Printed Mug" }, price: 69, colors: ["white","black"], sizes: SIZES_ONE, images: IMG.mug, trending: false, isNew: false, desc: makeDesc },
  { id: "a-mu-2", category: "accessories", sub: "mugs", name: { ar: "كوب سفر مطبوع", fr: "Mug de Voyage Imprimé", en: "Printed Travel Mug" }, price: 99, colors: ["black","navy","white"], sizes: SIZES_ONE, images: IMG.mug, trending: true, isNew: true, desc: makeDesc },
  { id: "a-mu-3", category: "accessories", sub: "mugs", name: { ar: "كوب شركات مطبوع", fr: "Mug Entreprise", en: "Corporate Mug" }, price: 59, colors: ["white","black"], sizes: SIZES_ONE, images: IMG.mug, trending: false, isNew: false, desc: makeDesc },

  { id: "a-ph-1", category: "accessories", sub: "phonecases", name: { ar: "غطاء هاتف مطبوع", fr: "Coque Téléphone Imprimée", en: "Printed Phone Case" }, price: 59, colors: ["white","black","clear"], sizes: ["iPhone 15","iPhone 14","iPhone 13","Samsung S24","Samsung S23"], images: IMG.phonecase, trending: true, isNew: false, desc: makeDesc },
  { id: "a-ph-2", category: "accessories", sub: "phonecases", name: { ar: "غطاء هاتف فني", fr: "Coque Artistique", en: "Artistic Phone Case" }, price: 69, colors: ["white","black"], sizes: ["iPhone 15","iPhone 14","iPhone 13","Samsung S24"], images: IMG.phonecase, trending: false, isNew: true, desc: makeDesc },

  { id: "a-st-1", category: "accessories", sub: "stickers", name: { ar: "ملصقات مخصصة بالقطعة", fr: "Stickers Personnalisés à la Pièce", en: "Custom Individual Stickers" }, price: 15, colors: ["white"], sizes: ["7cm","10cm","15cm"], images: IMG.sticker, trending: false, isNew: false, desc: makeDesc },
  { id: "a-st-2", category: "accessories", sub: "stickers", name: { ar: "مجموعة ملصقات مطبوعة", fr: "Pack Stickers Imprimés", en: "Printed Sticker Pack" }, price: 49, colors: ["white"], sizes: ["Pack 10","Pack 20","Pack 50"], images: IMG.sticker, trending: true, isNew: true, desc: makeDesc },
];

// WhatsApp order message builder
function buildWhatsAppMessage(product, size, color, qty, lang) {
  const t = TRANSLATIONS[lang].whatsapp;
  const colorName = COLORS[color] ? COLORS[color][lang] : color;
  const productName = product.name[lang];
  const msg = `${t.greeting}\n\n${t.product}: ${productName}\n${t.size}: ${size}\n${t.color}: ${colorName}\n${t.qty}: ${qty}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function buildCustomWhatsAppMessage(notes, lang) {
  const t = TRANSLATIONS[lang].whatsapp;
  const msg = `${t.custom}\n\n${notes}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
