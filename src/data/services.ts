import hair from "@/assets/service-hair.jpg";
import bridal from "@/assets/service-bridal.jpg";
import facial from "@/assets/service-facial.jpg";
import fullLegWax from "@/assets/FullLegWax.jpg";

export type Service = {
  slug: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  // Threading
  { slug: "eyebrow-threading", title: "Eyebrow Threading", duration: "15 mins", price: "₹40", description: "Precise eyebrow threading for defined brows.", image: facial },
  { slug: "upper-lip", title: "Upper Lip Threading", duration: "10 mins", price: "₹10", description: "Gentle upper lip hair removal.", image: facial },
  { slug: "chin", title: "Chin Threading", duration: "10 mins", price: "₹30", description: "Chin hair removal with threading.", image: facial },
  { slug: "full-face-threading", title: "Full Face Threading", duration: "30 mins", price: "₹100", description: "Complete facial threading treatment.", image: facial },
  
  // Haircuts
  { slug: "straight-cut", title: "Straight Cut", duration: "30 mins", price: "₹70", description: "Clean straight haircut tailored to your length.", image: hair },
  { slug: "light-u-cut", title: "Light U Cut", duration: "45 mins", price: "₹100", description: "Light U-shaped layered cut for soft volume.", image: hair },
  { slug: "deep-u-cut", title: "Deep U Cut", duration: "60 mins", price: "₹150", description: "Deep U-cut with pronounced layers.", image: hair },
  { slug: "v-cut", title: "V Cut", duration: "60 mins", price: "₹150", description: "V-shaped layered cut for dimension.", image: hair },
  { slug: "step-cut", title: "Step Cut", duration: "75 mins", price: "₹400", description: "Professional step cut with multiple layers.", image: hair },
  { slug: "layer-step", title: "Layer Step Cut", duration: "90 mins", price: "₹450", description: "Advanced layered step cut.", image: hair },
  { slug: "feather-cut", title: "Feather Cut", duration: "90 mins", price: "₹450", description: "Feathered layers for a light, airy look.", image: hair },
  { slug: "cutting-setting", title: "Cutting & Setting", duration: "120 mins", price: "₹750", description: "Haircut with professional blow-dry and setting.", image: hair },
  { slug: "front-layers", title: "Front Layers", duration: "30 mins", price: "₹100", description: "Front face-framing layers.", image: hair },
  { slug: "baby-cut", title: "Baby Cut", duration: "30 mins", price: "₹150", description: "Gentle haircut for children.", image: hair },
  { slug: "split-ends-cut", title: "Split Ends Cut", duration: "45 mins", price: "₹250", description: "Treatment cut to remove split ends.", image: hair },
  
  // Waxing
  { slug: "hand-wax-normal", title: "Hand Wax (Normal)", duration: "30 mins", price: "₹250", description: "Standard hand waxing treatment.", image: bridal },
  { slug: "hand-wax-chocolate", title: "Hand Wax (Chocolate)", duration: "30 mins", price: "₹300", description: "Luxury chocolate wax for hands.", image: bridal },
  { slug: "half-leg-wax", title: "Half Leg Wax", duration: "30 mins", price: "₹250", description: "Waxing for lower leg or thighs.", image: bridal },
  { slug: "full-leg-wax", title: "Full Leg Wax", duration: "45 mins", price: "₹400", description: "Complete leg waxing from hip to toe.", image: fullLegWax },
  { slug: "underarms", title: "Underarms Wax", duration: "15 mins", price: "₹50", description: "Quick underarm waxing.", image: bridal },
  { slug: "full-face-wax", title: "Full Face Wax", duration: "30 mins", price: "₹100", description: "Complete facial waxing treatment.", image: bridal },
  { slug: "upper-lip-wax", title: "Upper Lip Wax", duration: "10 mins", price: "₹25", description: "Gentle upper lip waxing.", image: bridal },
  { slug: "chin-wax", title: "Chin Wax", duration: "10 mins", price: "₹50", description: "Chin hair removal waxing.", image: bridal },
  
  // Facials
  { slug: "face-cleanup", title: "Face Cleanup", duration: "30 mins", price: "₹250", description: "Basic facial cleanup and refresh.", image: facial },
  { slug: "fruit-facial", title: "Fruit Facial", duration: "45 mins", price: "₹400", description: "Natural fruit extract facial for glowing skin.", image: facial },
  { slug: "gel-facial", title: "Gel Facial", duration: "60 mins", price: "₹500", description: "Advanced gel-based facial treatment.", image: facial },
  { slug: "wine-facial", title: "Wine Facial", duration: "60 mins", price: "₹600", description: "Luxurious wine extract facial.", image: facial },
  { slug: "tea-tree-facial", title: "Tea Tree Facial", duration: "60 mins", price: "₹600", description: "Anti-bacterial tea tree facial.", image: facial },
  { slug: "papaya-facial", title: "Papaya Facial", duration: "45 mins", price: "₹450", description: "Enzymatic papaya facial treatment.", image: facial },
  { slug: "strawberry-facial", title: "Strawberry Facial", duration: "45 mins", price: "₹450", description: "Vitamin-rich strawberry facial.", image: facial },
  { slug: "mixed-fruit-facial", title: "Mixed Fruit Facial", duration: "60 mins", price: "₹500", description: "Multi-fruit blend facial for radiance.", image: facial },
  { slug: "galvanic-facial", title: "Galvanic Facial", duration: "75 mins", price: "₹650", description: "Electric galvanic facial with deep penetration.", image: facial },
  { slug: "gold-facial", title: "Gold Facial", duration: "90 mins", price: "₹1500", description: "Premium gold-infused luxury facial.", image: facial },
  { slug: "diamond-facial", title: "Diamond Facial", duration: "90 mins", price: "₹2000", description: "Ultimate diamond peel facial treatment.", image: facial },
  { slug: "white-cleaning", title: "White Cleaning", duration: "90 mins", price: "₹2500", description: "Intensive whitening and brightening facial.", image: facial },
  { slug: "bridal-facial", title: "Bridal Facial", duration: "90 mins", price: "₹2000", description: "Pre-wedding glow-enhancing facial.", image: facial },
  { slug: "d-tan-facial", title: "D-Tan Facial", duration: "60 mins", price: "₹650", description: "De-tanning and radiance restoration facial.", image: facial },
  
  // Bleaches
  { slug: "cream-bleach", title: "Cream Bleach", duration: "30 mins", price: "₹250", description: "Classic cream bleach treatment.", image: facial },
  { slug: "fruit-bleach", title: "Fruit Bleach", duration: "30 mins", price: "₹250", description: "Natural fruit-infused bleach.", image: facial },
  { slug: "gel-bleach", title: "Gel Bleach", duration: "30 mins", price: "₹300", description: "Advanced gel bleach formula.", image: facial },
  { slug: "gold-bleach", title: "Gold Bleach", duration: "45 mins", price: "₹400", description: "Gold-enriched bleach treatment.", image: facial },
  { slug: "diamond-bleach", title: "Diamond Bleach", duration: "45 mins", price: "₹500", description: "Premium diamond bleach therapy.", image: facial },
  { slug: "oxy-bleach", title: "Oxy Bleach", duration: "30 mins", price: "₹400", description: "Oxygen-infused bleach for brightening.", image: facial },
  { slug: "imported-bleach", title: "Imported Bleach", duration: "45 mins", price: "₹600", description: "International premium bleach formula.", image: facial },
  
  // Packages
  { slug: "pkg-1500", title: "₹1,500 Package", duration: "120 mins", price: "₹1,500", description: "Fruit Facial, Manicure, Pedicure, Hand Wax, Head Massage.", image: facial },
  { slug: "pkg-2000", title: "₹2,000 Package", duration: "150 mins", price: "₹2,000", description: "Fruit Facial, Leg Wax, Hand Wax, D-Tan, Manicure, Head Massage.", image: facial },
  { slug: "pkg-2499", title: "₹2,499 Package", duration: "180 mins", price: "₹2,499", description: "Fruit Bleach, Wine Facial, Under Eye Treatment, Back Massage, Head Oil Massage, Haircut, Eyebrows.", image: facial },
  { slug: "pkg-3499", title: "₹3,499 Package", duration: "240 mins", price: "₹3,499", description: "Face D-Tan, Skin Brightening, Pimple Treatment, Back Massage, Pedicure, Manicure, Head Massage, Hair Spa, Hand & Leg Wax, Haircut.", image: facial },
  
  // Bridal
  { slug: "bridal-10k", title: "₹10,000 Bridal Package", duration: "300 mins", price: "₹10,000", description: "Facial, Hand & Leg Wax, Pedicure, Manicure, Eyebrow, Bridal Jewellery, Makeup.", image: bridal },
  { slug: "bridal-15k", title: "₹15,000 Bridal Package", duration: "480 mins", price: "₹15,000", description: "Includes makeup x2, Facial x2, Leg Wax x2, Hand Wax x2, Pedicure x2, Manicure x2, Jewellery x2, Mehendi x2.", image: bridal },
  
  // Makeup
  { slug: "party-makeup", title: "Party Makeup", duration: "60 mins", price: "₹1,500", description: "Glamorous party makeup for any occasion.", image: bridal },
  { slug: "engagement-makeup", title: "Engagement Makeup", duration: "90 mins", price: "₹3,000", description: "Special engagement look with precision and elegance.", image: bridal },
  { slug: "bridal-makeup-normal", title: "Normal Bridal Makeup", duration: "120 mins", price: "₹3,500", description: "Classic bridal makeup for your special day.", image: bridal },
  { slug: "mac-makeup", title: "M.A.C Makeup", duration: "120 mins", price: "₹8,000", description: "Premium M.A.C professional bridal makeup.", image: bridal },
  { slug: "hd-makeup", title: "H.D Makeup", duration: "120 mins", price: "₹5,000", description: "High-definition makeup perfect for photography.", image: bridal },
];

export const testimonials = [
  { name: "Chandini Chowdary", quote: "Good service, friendly environment with great expertise work, must visit for all your beauty needs." },
  { name: "Lavanya Alam", quote: "Best parlour in penumuru good service. One of the best beauty parlour in penumuru 😊." },
  { name: "Kosuru Anusha", quote: "Friendly staff ,good service, best parlour in penumuru." },
];

export const team = [
  { name: "Lily Chen", role: "Founder · Lead Stylist", bio: "12 years of editorial and bridal work across NY & SF." },
  { name: "Maya Rivera", role: "Senior Aesthetician", bio: "Specialist in result-driven facials and skincare." },
  { name: "Noor Ahmed", role: "Makeup Artist", bio: "Bridal & event makeup with a luminous signature finish." },
];
