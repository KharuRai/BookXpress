const { useState } = React;

    function Navbar() {
      return (
        <nav className="bg-[#1e2535] flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-3">
          <div className="flex items-center space-x-2">
            <i className="fas fa-train text-[#4a6cf7] text-lg"></i>
            <span className="font-semibold text-white text-sm sm:text-base">BookXpress</span>
          </div>
          <ul className="hidden md:flex space-x-8 text-xs sm:text-sm text-white/80 font-normal">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">My Bookings</a></li>
            <li><a href="#" className="hover:text-white">Profile</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
          <div className="flex items-center space-x-4 text-xs sm:text-sm">
            <button aria-label="Toggle dark mode" className="text-white/80 hover:text-white">
              <i className="fas fa-sun"></i>
            </button>
            <a href="#" className="text-white/80 hover:text-white">Login</a>
            <a href="#" className="bg-[#3b63f7] hover:bg-[#2f54e0] transition rounded px-3 py-1 text-white text-xs sm:text-sm font-semibold">Register</a>
          </div>
        </nav>
      );
    }

    function Hero() {
      const [quota, setQuota] = useState("general");
      return (
        <section className="bg-[#3b63f7] px-4 sm:px-6 md:px-10 lg:px-16 py-10">
          <h2 className="text-white font-semibold text-center text-sm sm:text-lg md:text-xl mb-6">
            Find and Book Train Tickets
          </h2>
          <form className="max-w-5xl mx-auto bg-[#1e2535] rounded-md p-4 shadow-lg" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div>
                <label htmlFor="from" className="sr-only">From</label>
                <input
                  id="from"
                  type="text"
                  placeholder="Enter city or station"
                  className="w-full bg-[#2a3147] text-white text-xs sm:text-sm rounded px-3 py-2 placeholder:text-[#7a8bbf]"
                />
              </div>
              <div>
                <label htmlFor="to" className="sr-only">To</label>
                <input
                  id="to"
                  type="text"
                  placeholder="Enter city or station"
                  className="w-full bg-[#2a3147] text-white text-xs sm:text-sm rounded px-3 py-2 placeholder:text-[#7a8bbf]"
                />
              </div>
              <div>
                <label htmlFor="date" className="sr-only">Date</label>
                <input
                  id="date"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-[#2a3147] text-white text-xs sm:text-sm rounded px-3 py-2 placeholder:text-[#7a8bbf]"
                />
              </div>
              <div>
                <label htmlFor="class" className="sr-only">Class</label>
                <select
                  id="class"
                  className="w-full bg-[#2a3147] text-white text-xs sm:text-sm rounded px-3 py-2 placeholder:text-[#7a8bbf]"
                >
                  <option disabled selected>Select Class</option>
                  <option>First Class</option>
                  <option>Second Class</option>
                  <option>Third Class</option>
                </select>
              </div>
            </div>
            <fieldset className="mb-4 text-xs sm:text-sm text-white/80 flex flex-wrap gap-4">
              <legend className="sr-only">Quotas</legend>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="quota"
                  value="general"
                  checked={quota === "general"}
                  onChange={() => setQuota("general")}
                  className="accent-[#3b63f7]"
                />
                <span>General</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="quota"
                  value="ladies"
                  checked={quota === "ladies"}
                  onChange={() => setQuota("ladies")}
                  className="accent-[#3b63f7]"
                />
                <span>Ladies</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="quota"
                  value="senior"
                  checked={quota === "senior"}
                  onChange={() => setQuota("senior")}
                  className="accent-[#3b63f7]"
                />
                <span>Senior Citizen</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="quota"
                  value="tatkal"
                  checked={quota === "tatkal"}
                  onChange={() => setQuota("tatkal")}
                  className="accent-[#3b63f7]"
                />
                <span>Tatkal</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="quota"
                  value="premium"
                  checked={quota === "premium"}
                  onChange={() => setQuota("premium")}
                  className="accent-[#3b63f7]"
                />
                <span>Premium Tatkal</span>
              </label>
            </fieldset>
            <button
              type="submit"
              className="w-full bg-[#3b63f7] hover:bg-[#2f54e0] transition rounded py-2 text-white text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2"
            >
              <i className="fas fa-search"></i>
              <span>Search Trains</span>
            </button>
          </form>
        </section>
      );
    }

    function PNRStatus() {
      return (
        <section className="bg-[#1e2535] rounded-md shadow-md">
          <h3 className="bg-[#3b63f7] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-t-md">
            PNR Status
          </h3>
          <form className="p-4 space-y-3" onSubmit={e => e.preventDefault()}>
            <label htmlFor="pnr" className="block text-xs sm:text-sm text-white/80 mb-1">Enter PNR Number</label>
            <input
              id="pnr"
              type="text"
              placeholder="10-digit PNR number"
              className="w-full bg-[#2a3147] text-white text-xs sm:text-sm rounded px-3 py-2 placeholder:text-[#7a8bbf]"
            />
            <button
              type="submit"
              className="w-full bg-[#3b63f7] hover:bg-[#2f54e0] transition rounded py-2 text-white text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2"
            >
              <i className="fas fa-search"></i>
              <span>Check Status</span>
            </button>
          </form>
        </section>
      );
    }

    function RecentSearches() {
      const searches = [
        { from: "Delhi", to: "Jaipur", date: "17 Aug" },
        { from: "Mumbai", to: "Pune", date: "15 Aug" },
        { from: "Bangalore", to: "Mysore", date: "20 Aug" },
      ];
      return (
        <section className="bg-[#1e2535] rounded-md shadow-md">
          <h3 className="bg-[#3b63f7] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-t-md">
            Recent Searches
          </h3>
          <ul className="p-4 space-y-4 text-xs sm:text-sm">
            {searches.map(({ from, to, date }, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-white/80">
                  <i className="far fa-clock text-xs"></i>
                  <div>
                    <span className="text-white font-semibold">{from}</span>
                    <span> to </span>
                    <span className="font-semibold">{to}</span>
                    <div className="text-[10px] text-white/50">{date}</div>
                  </div>
                </div>
                <a href="#" className="text-[#3b63f7] hover:underline text-xs sm:text-sm">Search Again</a>
              </li>
            ))}
          </ul>
        </section>
      );
    }

    function PopularRoutes() {
      const routes = [
        { from: "Delhi", to: "Mumbai", trains: 74 },
        { from: "Bangalore", to: "Chennai", trains: 18 },
        { from: "Kolkata", to: "Delhi", trains: 15 },
        { from: "Mumbai", to: "Ahmedabad", trains: 22 },
        { from: "Chennai", to: "Hyderabad", trains: 14 },
        { from: "Pune", to: "Mumbai", trains: 23 },
      ];
      return (
        <section className="bg-[#1e2535] rounded-md shadow-md">
          <h3 className="bg-[#3b63f7] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-t-md">
            Popular Routes
          </h3>
          <ul className="p-4 space-y-3 text-xs sm:text-sm">
            {routes.map(({ from, to, trains }, i) => (
              <li key={i} className="flex justify-between items-center text-white/80">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-[10px]"></i>
                  <div>
                    <span className="text-white font-semibold">{from}</span>
                    <span> to </span>
                    <span className="font-semibold">{to}</span>
                    <div className="text-[10px] text-white/50">{trains} trains available</div>
                  </div>
                </div>
                <a href="#" className="text-[#3b63f7] hover:underline text-xs sm:text-sm font-semibold">Book</a>
              </li>
            ))}
          </ul>
        </section>
      );
    }

    function TrendingOffer({ title, desc, code }) {
      return (
        <div className="bg-[#1e2535] rounded-md p-4 shadow-md text-xs sm:text-sm">
          <h5 className="font-semibold text-white mb-1">{title}</h5>
          <p className="text-white/70 mb-2">{desc}</p>
          <div className="bg-[#2a3147] rounded px-2 py-1 w-max text-white/70 text-[10px] sm:text-xs flex items-center justify-between space-x-2">
            <span>{code}</span>
            <button className="bg-[#3b63f7] hover:bg-[#2f54e0] transition rounded px-2 py-0.5 text-white text-[10px] sm:text-xs font-semibold">Apply</button>
          </div>
        </div>
      );
    }

    function TrendingOffers() {
      const offers = [
        { title: "Weekend Getaway", desc: "20% off on all weekend bookings", code: "WEEKEND20" },
        { title: "First Journey", desc: "Flat ₹100 off on your first booking", code: "FIRST100" },
        { title: "Senior Citizen", desc: "Additional 10% off for senior citizens", code: "SENIOR10" },
      ];
      return (
        <section>
          <h4 className="flex items-center space-x-2 text-white font-semibold text-sm sm:text-base mb-4">
            <i className="fas fa-chart-line text-[#3b63f7]"></i>
            <span>Trending Offers</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map(({ title, desc, code }, i) => (
              <TrendingOffer key={i} title={title} desc={desc} code={code} />
            ))}
          </div>
        </section>
      );
    }

    function FloatingChatButton() {
      return (
        <button
          aria-label="Chat support"
          className="fixed bottom-10 right-10 bg-[#3b63f7] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#2f54e0] transition"
        >
          <i className="fas fa-comment-alt text-white text-lg"></i>
        </button>
      );
    }

    function Footer() {
      return (
        <footer className="bg-[#1e2535] text-white text-xs sm:text-sm px-4 sm:px-6 md:px-10 lg:px-16 py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-train text-[#4a6cf7] text-lg"></i>
                <span className="font-semibold text-white text-sm sm:text-base">BookXpress</span>
              </div>
              <p className="text-white/70 text-[10px] sm:text-xs max-w-[220px]">
                Your trusted partner for hassle-free train bookings across the country.
              </p>
              <div className="flex space-x-4 mt-4 text-white/70 text-sm">
                <a href="#" aria-label="Facebook" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube" className="hover:text-white"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            <div>
              <h6 className="font-semibold mb-3 text-white text-xs sm:text-sm">Quick Links</h6>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">My Bookings</a></li>
                <li><a href="#" className="hover:text-white">PNR Status</a></li>
                <li><a href="#" className="hover:text-white">Cancellations</a></li>
                <li><a href="#" className="hover:text-white">Refunds</a></li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-3 text-white text-xs sm:text-sm">Information</h6>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-3 text-white text-xs sm:text-sm">Download Our App</h6>
              <p className="text-white/70 text-[10px] sm:text-xs max-w-[220px]">
                Book tickets, check PNR status, and get instant updates on your mobile.
              </p>
            </div>
          </div>
        </footer>
      );
    }

    function App() {
      return (
        <>
          <Navbar />
          <Hero />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PNRStatus />
              <RecentSearches />
              <PopularRoutes />
            </div>
            <TrendingOffers />
          </main>
          <FloatingChatButton />
          <Footer />
        </>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);