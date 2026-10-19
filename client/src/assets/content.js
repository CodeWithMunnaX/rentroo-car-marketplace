import { assets } from "./data";

// ---------- Testimonials ----------
export const reviews = [
  { name: "Rahul Mehta", city: "Delhi", image: assets.user1, date: "22 Jan 2025", rating: 5, car: "Jeep Compass", text: "Booked a Compass for a Manali trip. Car was spotless, pickup took five minutes and the price was exactly what the app showed." },
  { name: "Ananya Iyer", city: "Bengaluru", image: assets.user2, date: "08 Feb 2025", rating: 5, car: "Hyundai i20", text: "Bought my first car through Rentroo. The inspection report was detailed and the agency handled all the paperwork for me." },
  { name: "Vikram Singh", city: "Jaipur", image: assets.user3, date: "17 Mar 2025", rating: 5, car: "Maruti Ertiga", text: "Needed a 7-seater for a family wedding at short notice. Support sorted it at midnight and the Ertiga was delivered home." },
  { name: "Priya Nair", city: "Chennai", image: assets.user2, date: "02 Apr 2025", rating: 4, car: "Tata Tiago", text: "Super affordable for a weekend on the ECR. The car was a little dusty inside but drove perfectly and returned without any fuss." },
  { name: "Arjun Kapoor", city: "Mumbai", image: assets.user1, date: "19 Apr 2025", rating: 5, car: "Audi A7", text: "Rented the A7 for our anniversary. Felt premium from booking to drop-off. Razorpay payment was instant." },
  { name: "Sneha Reddy", city: "Hyderabad", image: assets.user2, date: "05 May 2025", rating: 5, car: "Kia Seltos", text: "Calendar booking is so easy — saw the total for 4 days before paying. The Seltos was brand new with full features." },
  { name: "Karan Joshi", city: "Pune", image: assets.user3, date: "21 May 2025", rating: 4, car: "Skoda Slavia", text: "Great car for the Mahabaleshwar ghats. Would love more automatic options in Pune, but overall a smooth experience." },
  { name: "Neha Gupta", city: "Patna", image: assets.user2, date: "09 Jun 2025", rating: 5, car: "Tata Altroz", text: "Finally a proper rental platform in Patna! Transparent pricing and the agency even dropped the car at my office." },
  { name: "Rohit Verma", city: "Delhi", image: assets.user1, date: "28 Jun 2025", rating: 5, car: "Mahindra Marazzo", text: "Listed my second car as an agency owner — got three bookings in the first week. Dashboard makes tracking earnings simple." },
];

// ---------- Careers ----------
export const jobs = [
  { title: "Senior Frontend Engineer (React)", team: "Engineering", location: "Bengaluru · Hybrid", type: "Full-time" },
  { title: "Backend Engineer (Node.js)", team: "Engineering", location: "Remote · India", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Bengaluru · Hybrid", type: "Full-time" },
  { title: "City Operations Manager", team: "Operations", location: "Delhi NCR", type: "Full-time" },
  { title: "Partner Success Associate", team: "Partnerships", location: "Mumbai", type: "Full-time" },
  { title: "Customer Support Specialist", team: "Support", location: "Remote · India", type: "Full-time / Shifts" },
];

export const perks = [
  { title: "Flexible work", text: "Hybrid or remote — work where you do your best work." },
  { title: "Health cover", text: "Medical insurance for you, your partner, kids and parents." },
  { title: "Free rentals", text: "Monthly travel credits to use on any car on Rentroo." },
  { title: "Learning budget", text: "₹50,000 a year for courses, books and conferences." },
];

// ---------- Press ----------
export const pressItems = [
  { outlet: "The Economic Times", date: "May 2025", title: "Rentroo crosses 3,000 listings as self-drive demand surges in tier-2 cities" },
  { outlet: "YourStory", date: "March 2025", title: "How Rentroo is bringing transparency to India's fragmented car rental market" },
  { outlet: "Autocar India", date: "February 2025", title: "Rent before you buy: platforms like Rentroo let you test-drive for a weekend" },
  { outlet: "Inc42", date: "January 2025", title: "Rentroo partners with 120+ local agencies to expand across 25 cities" },
];

// ---------- Partners ----------
export const partnerBenefits = [
  { title: "Reach more customers", text: "List your fleet in front of thousands of renters and buyers searching every day." },
  { title: "Owner dashboard", text: "Track bookings, earnings and availability for every car in one place." },
  { title: "Secure payouts", text: "Online payments through Razorpay with automatic payment confirmation." },
  { title: "Free to list", text: "No setup fee. Add cars with photos in minutes from the Add Car page." },
];

export const partnerSteps = [
  "Sign in and click “Register Agency” in the header",
  "Fill in your agency name, contact, address and city",
  "Add your cars with photos, prices and features",
  "Accept bookings and get paid online",
];

// ---------- Help Center ----------
export const faqs = [
  { category: "Booking", q: "How do I book a car?", a: "Open any car from the Listing page, choose your pick-up and drop-off dates on the calendar, tap Check Dates and then Book Car. Your booking appears in My Bookings." },
  { category: "Booking", q: "Do I need an account to book?", a: "You can browse without an account, but you need to sign in (Google or email) to book a car and manage your bookings." },
  { category: "Booking", q: "How is the price calculated?", a: "Total price = daily rent × number of days between pick-up and drop-off (minimum one day). You see the total before you book." },
  { category: "Payments", q: "Which payment methods are supported?", a: "We use Razorpay, so you can pay with credit/debit cards, UPI, net banking and popular wallets. Some agencies also allow pay at pickup." },
  { category: "Payments", q: "My payment succeeded but the booking shows Unpaid", a: "Refresh My Bookings — we automatically re-check the payment with Razorpay. If it still shows Unpaid after a few minutes, contact support with your booking ID." },
  { category: "Payments", q: "Is my card information safe?", a: "Yes. Card details are entered directly in Razorpay's PCI-DSS compliant checkout and never touch our servers." },
  { category: "Cancellation", q: "Can I cancel my booking and get a refund?", a: "Yes. Cancel up to 24 hours before pick-up for a full refund. Later cancellations are charged one day's rent. See Cancellation Options for details." },
  { category: "Cancellation", q: "How long does a refund take?", a: "Refunds are processed within 2 business days. UPI refunds usually arrive in 1–3 days, cards and net banking in 5–7 business days." },
  { category: "Documents", q: "What documents do I need at pickup?", a: "A valid driving licence, a government ID (Aadhaar, passport or voter ID) and the card used for payment if the agency asks for a deposit." },
  { category: "Agencies", q: "How do I list my cars on Rentroo?", a: "Sign in, click Register Agency in the header, fill in your details and then add cars from your owner Dashboard." },
  { category: "Agencies", q: "When do agencies receive payment?", a: "Online payments are confirmed instantly and appear in the Total Earnings card on your Dashboard." },
];

// ---------- Long-form policy pages ----------
export const infoPages = {
  safety: {
    eyebrow: "Support",
    title: "Safety Information",
    intro: "Your safety comes first. Every agency on Rentroo is verified and every car goes through an inspection before it is listed. Here's what we do — and what you can do — to keep every trip safe.",
    sections: [
      { heading: "Verified agencies and cars", list: ["Agencies are verified with business and contact details before listing", "Cars must have valid RC, insurance and PUC certificates", "Photos and odometer readings are required for every listing"] },
      { heading: "Before you drive", list: ["Inspect tyres, lights, brakes and seatbelts", "Photograph the car's condition at pickup", "Save the agency's emergency contact number", "Check the spare tyre, jack and warning triangle"] },
      { heading: "On the road", list: ["Always wear seatbelts — front and rear", "Never drink and drive; it voids insurance and is illegal", "Avoid driving more than 6–7 hours a day", "Use child seats for young children"] },
      { heading: "In an emergency", text: "Call 112 for police, fire or medical emergencies. For breakdowns or accidents, contact the agency first, then reach Rentroo support at +91 98765 43210 — we're available 24/7." },
    ],
  },
  cancellation: {
    eyebrow: "Support",
    title: "Cancellation Options",
    intro: "Plans change. Here's how cancellations and refunds work on Rentroo.",
    sections: [
      { heading: "Free cancellation", text: "Cancel up to 24 hours before your pick-up time for a full refund to your original payment method." },
      { heading: "Late cancellation", list: ["Less than 24 hours before pick-up: one day's rent is charged", "No-show without cancelling: 50% of the booking value is charged"] },
      { heading: "Refund timeline", text: "Refunds are processed within 2 business days. Cards and net banking typically reflect the refund in 5–7 business days, UPI within 1–3 days." },
      { heading: "How to cancel", text: "Contact the agency or Rentroo support with your booking ID from My Bookings. Self-serve cancellation from the app is coming soon." },
      { heading: "Cancellations by the agency", text: "If an agency cancels your booking, you receive a full refund and our team will help you find a similar car at the same price." },
    ],
  },
  accessibility: {
    eyebrow: "Support",
    title: "Accessibility",
    intro: "We want Rentroo to work for everyone, including people with disabilities.",
    sections: [
      { heading: "Our commitment", text: "We aim to meet WCAG 2.1 AA guidelines across our website and continuously improve contrast, keyboard navigation and screen reader support." },
      { heading: "What we support", list: ["Keyboard navigation for search, calendar and booking", "Descriptive labels on form fields and buttons", "Readable colour contrast in our light theme", "Responsive layouts that work with browser zoom up to 200%"] },
      { heading: "Accessible vehicles", text: "Need a car with automatic transmission, hand controls or extra space for a wheelchair? Contact support and we'll help match you with a suitable agency." },
      { heading: "Feedback", text: "If something isn't working for you, email accessibility@rentroo.com. We respond within 2 business days." },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "This policy explains what information Rentroo collects, how we use it and the choices you have. Last updated: 1 June 2025.",
    sections: [
      { heading: "Information we collect", list: ["Account details: name, email and profile photo from your sign-in provider", "Booking details: cars, dates, prices and recent searches", "Payment status from Razorpay (we never store card numbers)", "Basic device and usage data to keep the service secure"] },
      { heading: "How we use it", list: ["To create and manage your bookings", "To share necessary booking details with the agency you book with", "To send booking confirmations and important updates", "To prevent fraud and improve our service"] },
      { heading: "Sharing", text: "We share information only with the agency handling your booking and with service providers that run our platform (authentication, payments, image hosting and email). We never sell your personal data." },
      { heading: "Your choices", text: "You can update your profile from the account menu, and request a copy or deletion of your data by emailing privacy@rentroo.com." },
      { heading: "Contact", text: "Questions about privacy? Write to privacy@rentroo.com." },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "By using Rentroo you agree to these terms. Please read them carefully. Last updated: 1 June 2025.",
    sections: [
      { heading: "Our role", text: "Rentroo is a marketplace connecting renters and buyers with independent car agencies. The rental agreement for each booking is between you and the agency." },
      { heading: "Eligibility", list: ["You must be at least 21 years old to rent", "You must hold a valid driving licence for at least one year", "Only listed drivers may drive the rented car"] },
      { heading: "Bookings and payments", text: "Prices shown include the daily rent multiplied by the number of days. Payment is collected online via Razorpay or at pickup where the agency allows it." },
      { heading: "Your responsibilities", list: ["Return the car on time, in the same condition and with the agreed fuel level", "Pay fines, tolls and parking charges incurred during your rental", "Report accidents or damage to the agency immediately"] },
      { heading: "Agency responsibilities", text: "Agencies must provide roadworthy, insured vehicles matching their listing, and honour confirmed bookings." },
      { heading: "Changes", text: "We may update these terms from time to time. Continued use of Rentroo after changes means you accept the updated terms." },
    ],
  },
};
