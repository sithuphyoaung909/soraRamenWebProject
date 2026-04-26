import { FormEvent, useEffect, useMemo, useState } from "react";

type Page = "home" | "menu" | "stores" | "storeDetail" | "reservation" | "about" | "contact";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

type Store = {
  id: string;
  name: string;
  area: string;
  image: string;
  thumbs: string[];
  address: string;
  phone: string;
  seats: string[];
  parking: string;
  hours: string;
  access: string;
};

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Menu", page: "menu" },
  { label: "Stores", page: "stores" },
  { label: "About", page: "about" },
  { label: "Contact Us", page: "contact" }
];

const ramenItems: MenuItem[] = [
  {
    name: "Tonkotsu Ramen",
    description: "Rich pork broth with chashu, soft-boiled egg, spring onion, and seaweed.",
    price: "1,050",
    image: "tokontsuRamen.png"
  },
  {
    name: "Shoyu Ramen",
    description: "Classic soy sauce broth with sliced pork, bamboo shoots, and fresh noodles.",
    price: "1,050",
    image: "shoyuRamen.png"
  },
  {
    name: "Miso Corn Ramen",
    description: "Creamy miso broth topped with sweet corn, egg, and roasted pork.",
    price: "1,050",
    image: "misoCornRamen.png"
  },
  {
    name: "Spicy Ramen",
    description: "A bold and spicy bowl with minced meat, chili oil, vegetables, and egg.",
    price: "1,050",
    image: "spicyRamen.png"
  }
];

const sideDishes: MenuItem[] = [
  {
    name: "Gyoza",
    description: "Pan-fried dumplings filled with pork and vegetables.",
    price: "450",
    image: "sideDishes1.png"
  },
  {
    name: "Karaage",
    description: "Japanese fried chicken with crispy coating.",
    price: "550",
    image: "Homepagekaraage.png"
  },
  {
    name: "Fried Rice",
    description: "Classic Japanese fried rice with vegetables and egg.",
    price: "650",
    image: "sideDishes3.png"
  }
];

const drinks: MenuItem[] = [
  {
    name: "Draft Beer",
    description: "Cold Japanese beer served fresh.",
    price: "450",
    image: "homepageBeer.png"
  },
  {
    name: "Lemon Soda",
    description: "Refreshing soda with lemon flavour.",
    price: "550",
    image: "drinks2.png"
  },
  {
    name: "Matcha Drink",
    description: "Sweet and refreshing iced matcha beverage.",
    price: "650",
    image: "drinks3.png"
  }
];

const stores: Store[] = [
  {
    id: "kasumigaseki",
    name: "Kasumigaseki Common Gate Branch",
    area: "Minato-ku",
    image: "store1_Kasumikaseki.png",
    thumbs: [
      "store1_thumbnails1.png",
      "store1_thumbnails2.png",
      "store1_thumbnails3.png",
      "store1_thumbnails4.png",
      "store1_thumbnails5.png"
    ],
    address: "2-2-10 Nanokawa, Minami-ku, Fukuoka City, Fukuoka Prefecture 815-0085",
    phone: "092-555-2673",
    seats: ["Counter seating for focused dining: 15 seats", "Table seating: None", "Private room: None"],
    parking: "We have 10 parking slots right beside the branch.",
    hours: "10 A.M. - 11 P.M.",
    access:
      "50m from the Nanokawa intersection. 7-minute walk from Nishi-Tetsu station. Bicycle parking available."
  },
  {
    id: "coredo",
    name: "COREDO Muromachi Branch",
    area: "Chiyoda-ku",
    image: "store2_COREDO.png",
    thumbs: [],
    address: "2-3-1 Nihonbashi Muromachi, Chuo-ku, Tokyo",
    phone: "03-6231-7788",
    seats: ["Counter: 12 seats", "Table: 20 seats"],
    parking: "Partner parking available in the mall.",
    hours: "11 A.M. - 10 P.M.",
    access: "Connected to Mitsukoshimae Station."
  },
  {
    id: "bistro",
    name: "Bistro Cafe Momonashi",
    area: "Nakano-ku",
    image: "store3_BistroCafe.png",
    thumbs: [],
    address: "5-8-3 Nakano, Tokyo",
    phone: "03-3770-5599",
    seats: ["Counter: 10 seats", "Table: 18 seats"],
    parking: "No private parking.",
    hours: "10 A.M. - 10 P.M.",
    access: "5-minute walk from Nakano Station."
  },
  {
    id: "otemachi",
    name: "Otemachi Suki Branch",
    area: "Kokubunji-ku",
    image: "store4_OtemachiSaki.png",
    thumbs: [],
    address: "1-7 Otemachi, Tokyo",
    phone: "03-3388-2211",
    seats: ["Counter: 8 seats", "Table: 25 seats"],
    parking: "Underground paid parking.",
    hours: "11 A.M. - 11 P.M.",
    access: "2-minute walk from Otemachi Station."
  },
  {
    id: "toki",
    name: "Toki Doki Branch",
    area: "Kodaira-ku",
    image: "store5_TokiDoki.png",
    thumbs: [],
    address: "2-5 Kodaira, Tokyo",
    phone: "03-8866-9871",
    seats: ["Counter: 14 seats", "Table: 16 seats"],
    parking: "Limited curbside parking.",
    hours: "10 A.M. - 10 P.M.",
    access: "Direct bus from Kodaira Station."
  },
  {
    id: "sabishi",
    name: "Sabishi Kuchi Branch",
    area: "Tokorozawa-ku",
    image: "store6_SabishiiKuchi.png",
    thumbs: [],
    address: "6-4 Tokorozawa, Saitama",
    phone: "04-2999-3400",
    seats: ["Counter: 10 seats", "Table: 20 seats"],
    parking: "Free parking for 2 hours.",
    hours: "11 A.M. - 10 P.M.",
    access: "Near Tokorozawa Central Mall."
  }
];

const faqItems = [
  "Is this hand-crafted ramen?",
  "Walk-in dining is available?",
  "Do you have delivery service?",
  "Why are the noodles cut to a box?",
  "Are the menu items safe for child?"
];

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [activeStoreId, setActiveStoreId] = useState(stores[0].id);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [menuJumpTarget, setMenuJumpTarget] = useState<string | null>(null);

  const activeStore = useMemo(
    () => stores.find((store) => store.id === activeStoreId) ?? stores[0],
    [activeStoreId]
  );

  const navigate = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onReservationSubmit = (event: FormEvent) => {
    event.preventDefault();
    setConfirmVisible(true);
    window.setTimeout(() => setConfirmVisible(false), 2500);
  };

  useEffect(() => {
    if (activePage !== "menu" || !menuJumpTarget) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const target = document.getElementById(menuJumpTarget);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuJumpTarget(null);
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [activePage, menuJumpTarget]);

  const openMenuSection = (targetId: string) => {
    setMenuJumpTarget(targetId);
    navigate("menu");
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 md:px-8">
      <div className="app-shell mx-auto max-w-[1080px] bg-black text-white">
        <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/95 px-4 py-4 backdrop-blur sm:px-6 sm:py-5 md:px-10 md:py-6">
          <button onClick={() => navigate("home")} className="group text-left">
            <BrandLogo />
          </button>
          <nav className="flex flex-wrap items-center gap-5 text-sm">
            {navItems.map((item) => {
              const isActive = item.page === "stores" ? activePage === "stores" || activePage === "storeDetail" : activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`border-b pb-1 transition-colors ${
                    isActive ? "border-red-600 text-white" : "border-transparent text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </header>

        <main className="page-enter px-6 pb-14 md:px-10">
          {activePage === "home" && (
            <section className="space-y-8">
              <div className="relative overflow-hidden">
                <video
                  className="h-[360px] w-full object-cover sm:h-[440px] md:h-[720px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="HeroImageDesign.png"
                >
  <source src="/videos/hero2.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/55" />
                <div className="absolute left-8 top-14 leading-none text-white/95">
                  <p className="text-4xl italic font-light md:text-5xl">Authentic</p>
                  <p className="text-6xl font-medium tracking-tight md:text-7xl">Ramen</p>
                </div>
                <div className="absolute bottom-12 right-8 text-right leading-none text-white/90">
                  <p className="text-4xl italic font-light md:text-5xl">Craft</p>
                  <p className="text-6xl font-medium tracking-tight md:text-7xl">Daily!</p>
                </div>
              </div>

              <div className="space-y-7">
                <HighlightRow
                  image={ramenItems[0].image}
                  title="Signature Tonkotsu Ramen"
                  description="Our most popular bowl combines slow-cooked pork broth, tender chashu, soft-boiled egg, and fresh noodles for a rich and satisfying experience."
                  onClick={() => openMenuSection("menu-tonkotsu")}
                />
                <HighlightRow
                  image={sideDishes[1].image}
                  title="Crispy Japanese Karaage"
                  description="Golden fried chicken with a juicy center, lightly seasoned and served fresh. Perfect together with ramen or drinks."
                  reverse
                  onClick={() => openMenuSection("menu-karaage")}
                />
                <HighlightRow
                  image={drinks[0].image}
                  title="Local Beer & Refreshing Drinks"
                  description="Enjoy cold Japanese beer, soft drinks, and seasonal beverages that pair perfectly with every meal."
                  onClick={() => openMenuSection("menu-drinks")}
                />
              </div>

              <div className="space-y-5 pb-8">
                <button
                  onClick={() => navigate("menu")}
                  className="bg-red-600 px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  View More &gt;&gt;&gt;
                </button>
                <div className="relative pb-4 md:min-h-[420px]">
                  <div className="grid gap-2 sm:grid-cols-2 md:pl-36">
                    {stores.slice(0, 4).map((store) => (
                      <button
                        key={store.id}
                        onClick={() => {
                          setActiveStoreId(store.id);
                          navigate("storeDetail");
                        }}
                        className="text-left"
                      >
                        <img src={store.image} alt={store.name} className="h-75 w-full object-cover transition-opacity hover:opacity-90" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 bg-[#34373b] px-6 py-6 text-white md:absolute md:left-0 md:top-1/2 md:mt-0 md:max-w-[420px] md:-translate-y-1/2 md:z-10">
                    <p className="text-white/80">
                      Each Sora Ramen location offers a warm atmosphere, modern Japanese interiors, and freshly prepared dishes every day.
                    </p>
                    <button
                      onClick={() => navigate("stores")}
                      className="mt-4 bg-red-600 px-4 py-2 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      See the Stores &gt;&gt;&gt;
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="rounded-md bg-white px-4 py-2 text-sm text-black transition-colors hover:bg-white/90"
                  >
                    Back to Top ^
                  </button>
                </div>
              </div>
            </section>
          )}

          {activePage === "menu" && (
            <section className="space-y-10">
              <h1 className="text-4xl font-semibold">Ramen</h1>
              <div className="space-y-8">
                {ramenItems.map((item, index) => (
                  <article
                    key={item.name}
                    id={index === 0 ? "menu-tonkotsu" : undefined}
                    className="grid gap-6 md:grid-cols-[300px_1fr]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full object-cover transition duration-500 hover:scale-[1.02]"
                    />
                    <div className="space-y-4 pt-3">
                      <h2 className="text-3xl font-semibold">{item.name}</h2>
                      <p className="max-w-lg text-sm text-white/80">{item.description}</p>
                      <p className="text-3xl font-semibold">{`¥ ${item.price}/-`}</p>
                    </div>
                  </article>
                ))}
              </div>

              <MenuGrid title="Side Dishes" items={sideDishes} itemAnchorMap={{ Karaage: "menu-karaage" }} />
              <MenuGrid title="Drinks" items={drinks} sectionId="menu-drinks" />

              <div className="flex justify-end">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="rounded-md bg-white px-4 py-2 text-sm text-black transition-colors hover:bg-white/90"
                >
                  Back to Top ^
                </button>
              </div>
            </section>
          )}

          {activePage === "stores" && (
            <section className="space-y-8">
              <h1 className="text-4xl font-semibold">Store Informations</h1>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => {
                      setActiveStoreId(store.id);
                      navigate("storeDetail");
                    }}
                    className="group relative overflow-hidden text-left transition duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={store.image}
                      alt={store.name}
                      className="h-65 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/65 p-3 transition-colors duration-300 group-hover:bg-black/78">
                      <p className="text-xs text-white/70">{store.area}</p>
                      <p className="text-lg font-medium">{store.name}</p>
                    </div>
                    <span className="pointer-events-none absolute inset-0 border border-white/0 transition duration-300 group-hover:border-white/25" />
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("reservation")}
                  className="bg-red-600 px-5 py-2 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Make a Reservation
                </button>
              </div>
            </section>
          )}

          {activePage === "storeDetail" && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-5xl font-semibold">Store Details</h1>
                <button
                  onClick={() => navigate("stores")}
                  className="border border-white/45 px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                >
                  Back to Stores
                </button>
              </div>
              <div className="space-y-6 border-t border-white/15 pt-6">
                <img src={activeStore.image} alt={activeStore.name} className="h-[720px] w-full object-cover" />
                {activeStore.thumbs.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {activeStore.thumbs.map((thumb) => (
                      <img key={thumb} src={thumb} alt="Store preview" className="h-30 w-full object-cover" />
                    ))}
                  </div>
                )}
                <h2 className="text-4xl font-semibold">{activeStore.name}</h2>
                <dl className="space-y-4 text-sm text-white/85">
                  <div className="grid gap-2 md:grid-cols-[180px_1fr]">
                    <dt className="font-medium text-white">Address</dt>
                    <dd>{activeStore.address}</dd>
                  </div>
                  <div className="grid gap-2 md:grid-cols-[180px_1fr]">
                    <dt className="font-medium text-white">Telephone</dt>
                    <dd>{activeStore.phone}</dd>
                  </div>
                  <div className="grid gap-2 md:grid-cols-[180px_1fr]">
                    <dt className="font-medium text-white">Number of Seats</dt>
                    <dd>
                      {activeStore.seats.map((seat) => (
                        <p key={seat}>- {seat}</p>
                      ))}
                    </dd>
                  </div>
                  <div className="grid gap-2 md:grid-cols-[180px_1fr]">
                    <dt className="font-medium text-white">Parking</dt>
                    <dd>{activeStore.parking}</dd>
                  </div>
                  <div className="grid gap-2 md:grid-cols-[180px_1fr]">
                    <dt className="font-medium text-white">Business Hours</dt>
                    <dd>{activeStore.hours}</dd>
                  </div>
                </dl>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
                  alt="Map to store"
                  className="h-[380px] w-full object-cover"
                />
                <div className="space-y-2 text-sm text-white/80">
                  <p className="font-medium text-white">How to Access</p>
                  <p>{activeStore.access}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate("reservation")}
                    className="bg-red-600 px-5 py-2 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Make a Reservation
                  </button>
                </div>
              </div>
            </section>
          )}

          {activePage === "reservation" && (
            <section className="space-y-7">
              <p className="text-lg text-white/90">Please choose a restaurant.</p>
              <form className="space-y-5" onSubmit={onReservationSubmit}>
                <div className="grid gap-4">
                  <select className="h-11 bg-white px-4 text-black" defaultValue={activeStore.id}>
                    {stores.map((store) => (
                      <option value={store.id} key={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <select className="h-11 bg-white px-4 text-black" defaultValue="">
                    <option value="">--- Date ---</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="weekend">This Weekend</option>
                  </select>
                  <select className="h-11 bg-white px-4 text-black" defaultValue="">
                    <option value="">--- Time ---</option>
                    <option>11:30</option>
                    <option>12:30</option>
                    <option>18:30</option>
                    <option>20:00</option>
                  </select>
                  <select className="h-11 bg-white px-4 text-black" defaultValue="">
                    <option value="">--- Adult ---</option>
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <option key={count}>{count}</option>
                    ))}
                  </select>
                  <select className="h-11 bg-white px-4 text-black" defaultValue="">
                    <option value="">--- Child ---</option>
                    {[0, 1, 2, 3, 4].map((count) => (
                      <option key={count}>{count}</option>
                    ))}
                  </select>
                  <select className="h-11 bg-white px-4 text-black md:col-span-1" defaultValue="">
                    <option value="">--- Infant ---</option>
                    {[0, 1, 2].map((count) => (
                      <option key={count}>{count}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-red-600 px-6 py-2 text-sm font-medium hover:bg-red-500">
                    Confirm
                  </button>
                </div>
              </form>

              {confirmVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
                  <div className="toast-enter relative w-full max-w-md bg-white px-6 py-6 text-black shadow-2xl">
                    <button
                      type="button"
                      onClick={() => setConfirmVisible(false)}
                      className="absolute right-3 top-2 text-2xl leading-none text-black/55 transition-colors hover:text-black"
                      aria-label="Close confirmation"
                    >
                      x
                    </button>
                    <p className="text-center text-xl font-medium">Your reservation is confirmed.</p>
                  </div>
                </div>
              )}
            </section>
          )}

          {activePage === "about" && (
            <section className="space-y-6">
              <img
                src="aboutUs.png"
                alt="Chef preparing fresh noodles"
                className="h-[660px] w-full object-cover"
              />
              <div>
                <h1 className="mb-3 text-3xl font-semibold">About us</h1>
                <p className="max-w-4xl text-sm leading-6 text-white/85">
                  At Sora Ramen, we believe great ramen starts with care. Every bowl is prepared using fresh ingredients,
                  handmade noodles, and broth simmered for hours to create deep flavour inspired by modern Japanese dining
                  culture. Sora Ramen is designed to be a place where people can enjoy authentic taste in a warm welcoming
                  atmosphere, whether you visit for a quick lunch, dinner with friends, or a relaxing meal shared with your
                  loved ones. We look forward to serving you.
                </p>
              </div>
              <button
                onClick={() => navigate("contact")}
                className="bg-red-600 px-5 py-2 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact us
              </button>
            </section>
          )}

          {activePage === "contact" && (
            <section className="space-y-10">
              <form className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="h-11 w-full bg-white px-4 text-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address:
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="h-11 w-full bg-white px-4 text-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    className="h-64 w-full resize-none bg-white p-4 text-black outline-none"
                  />
                </div>
              </form>

              <div className="bg-[#dadada] p-4 text-black">
                <h2 className="mb-4 text-center text-2xl font-semibold">FAQ</h2>
                <div className="space-y-1">
                  {faqItems.map((question, index) => {
                    const open = expandedFaq === index;
                    return (
                      <div key={question} className="bg-[#efefef]">
                        <button
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-sm"
                          onClick={() => setExpandedFaq(open ? null : index)}
                          type="button"
                        >
                          <span>{question}</span>
                          <span>{open ? "-" : "+"}</span>
                        </button>
                        {open && <p className="px-3 pb-3 text-sm text-black/70">Yes. Our team can help with this request.</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-4 bg-[#bfbfbf] px-6 py-4 text-xs text-black md:px-10">
          <p>2026, Copyright Sora Ramen All Rights Reserved, 2026</p>
          <div className="flex items-center gap-2 text-sm">
            <SocialIcon label="f" />
            <SocialIcon label="ig" />
            <SocialIcon label="t" />
          </div>
        </footer>
      </div>
    </div>
  );
}

function HighlightRow({
  image,
  title,
  description,
  reverse = false,
  onClick
}: {
  image: string;
  title: string;
  description: string;
  reverse?: boolean;
  onClick?: () => void;
}) {
  const body = (
    <>
      <img
        src={image}
        alt={title}
        className={`h-100 w-full object-cover transition duration-500 hover:scale-[1.02] ${reverse ? "md:order-2 md:col-span-3" : "md:col-span-3"}`}
      />
      <div
        className={`bg-[#34373b] p-6 text-center ${
          reverse
            ? "md:order-1 md:col-span-2 md:-mr-6 md:relative md:z-10"
            : "md:col-span-2 md:-ml-6 md:relative md:z-10"
        }`}
      >
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="mt-4 text-sm text-white/85">{description}</p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="grid w-full items-center gap-0 text-left md:grid-cols-5"
      >
        {body}
      </button>
    );
  }

  return (
    <div className="grid items-center gap-0 md:grid-cols-5">
      {body}
    </div>
  );
}

function MenuGrid({
  title,
  items,
  sectionId,
  itemAnchorMap
}: {
  title: string;
  items: MenuItem[];
  sectionId?: string;
  itemAnchorMap?: Record<string, string>;
}) {
  return (
    <section id={sectionId} className="space-y-5">
      <h2 className="text-4xl font-semibold">{title}</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.name} id={itemAnchorMap?.[item.name]} className="space-y-3">
            <img src={item.image} alt={item.name} className="h-60 w-full object-cover transition duration-500 hover:scale-105" />
            <h3 className="text-3xl font-semibold">{item.name}</h3>
            <p className="text-sm text-white/75">{item.description}</p>
            <p className="text-3xl font-semibold">{`¥ ${item.price}/-`}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SocialIcon({ label }: { label: string }) {
  return <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black">{label}</span>;
}

function BrandLogo() {
  return (
    <img
      src="/logo-sora.png"
      alt="Sora ramen"
      className="h-16 w-auto transition-opacity duration-300 group-hover:opacity-95"
    />
  );
}
