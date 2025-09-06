const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Stock = require("./models/Stock");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected, seeding data...");

    const stocks = [
  {
    name: "OYO Rooms",
    price: "₹1,250.00",
    marketCap: "₹85,000 Cr",
    change: "+32%",
    logo: "https://logo.clearbit.com/oyorooms.com?size=128",
  },
  {
    name: "Swiggy",
    price: "₹1,120.00",
    marketCap: "₹1,05,000 Cr",
    change: "+45%",
    logo: "https://logo.clearbit.com/swiggy.com?size=128",
  },
  {
    name: "Zomato",
    price: "₹850.00",
    marketCap: "₹65,000 Cr",
    change: "+20%",
    logo: "https://logo.clearbit.com/zomato.com?size=128",
  },
  {
    name: "Byju’s",
    price: "₹2,450.00",
    marketCap: "₹1,80,000 Cr",
    change: "-15%",
    logo: "https://logo.clearbit.com/byjus.com?size=128",
  },
  {
    name: "Reliance Retail",
    price: "₹3,200.00",
    marketCap: "₹8,50,000 Cr",
    change: "+12%",
    logo: "https://logo.clearbit.com/relianceretail.com?size=128",
  },
  {
    name: "Paytm Payments Bank",
    price: "₹900.00",
    marketCap: "₹45,000 Cr",
    change: "-8%",
    logo: "https://logo.clearbit.com/paytmbank.com?size=128",
  },
  {
    name: "HDFC Securities",
    price: "₹1,560.00",
    marketCap: "₹55,000 Cr",
    change: "+22%",
    logo: "https://logo.clearbit.com/hdfcsec.com?size=128",
  },
  {
    name: "Tata Technologies",
    price: "₹2,980.00",
    marketCap: "₹1,20,000 Cr",
    change: "+18%",
    logo: "https://logo.clearbit.com/tatatechnologies.com?size=128",
  },
  {
    name: "HDB Financial Services",
    price: "₹740.00",
    marketCap: "₹58,690 Cr",
    change: "-38%",
    logo: "https://logo.clearbit.com/hdbfs.com?size=128",
  },{
  name: "Reliance Industries",
  price: "₹2450",
  marketCap: "₹17T",
  change: "+2.3%",
  logo: "https://companieslogo.com/img/orig/RELIANCE.NS-4a79e4d3.png"
},
  {
    name: "Reliance Jio Platforms",
    price: "₹3,850.00",
    marketCap: "₹9,60,000 Cr",
    change: "+28%",
    logo: "https://logo.clearbit.com/jio.com?size=128",
  },
  {
    name: "Delhivery",
    price: "₹620.00",
    marketCap: "₹38,000 Cr",
    change: "+9%",
    logo: "https://logo.clearbit.com/delhivery.com?size=128",
  },
  {
    name: "BigBasket",
    price: "₹1,050.00",
    marketCap: "₹52,000 Cr",
    change: "+30%",
    logo: "https://logo.clearbit.com/bigbasket.com?size=128",
  },
  {
    name: "MobiKwik",
    price: "₹430.00",
    marketCap: "₹9,500 Cr",
    change: "-5%",
    logo: "https://logo.clearbit.com/mobikwik.com?size=128",
  },
  {
    name: "Ixigo",
    price: "₹520.00",
    marketCap: "₹12,000 Cr",
    change: "+17%",
    logo: "https://logo.clearbit.com/ixigo.com?size=128",
  },
  {
    name: "Dream11",
    price: "₹1,980.00",
    marketCap: "₹72,000 Cr",
    change: "+42%",
    logo: "https://logo.clearbit.com/dream11.com?size=128",
  },
  {
    name: "Cars24",
    price: "₹1,280.00",
    marketCap: "₹26,000 Cr",
    change: "+11%",
    logo: "https://logo.clearbit.com/cars24.com?size=128",
  },
  {
    name: "PolicyBazaar",
    price: "₹980.00",
    marketCap: "₹35,000 Cr",
    change: "+14%",
    logo: "https://logo.clearbit.com/policybazaar.com?size=128",
  },
  {
    name: "Pharmeasy",
    price: "₹660.00",
    marketCap: "₹21,000 Cr",
    change: "-10%",
    logo: "https://logo.clearbit.com/pharmeasy.in?size=128",
  },
  {
    name: "Udaan",
    price: "₹890.00",
    marketCap: "₹19,000 Cr",
    change: "+8%",
    logo: "https://logo.clearbit.com/udaan.com?size=128",
  },
  {
    name: "Ola Electric",
    price: "₹1,350.00",
    marketCap: "₹48,000 Cr",
    change: "+25%",
    logo: "https://logo.clearbit.com/olaelectric.com?size=128",
  },
];


    await Stock.deleteMany(); // clear old data
    await Stock.insertMany(stocks);

    console.log("✅ Stocks seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ DB error:", err));
