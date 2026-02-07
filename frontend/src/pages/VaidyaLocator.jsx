import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { IoClose, IoLocationSharp } from "react-icons/io5";
import {
  MdMenu,
  MdArrowBack,
  MdMyLocation,
  MdLocationOff,
} from "react-icons/md";
import {
  SearchIcon,
  Award,
  Phone,
  MapPin,
  FileBadge,
  Briefcase,
} from "lucide-react";

// --- 1. DATA WITH CITY FIELDS ADDED ---
const rawVaidyasData = [
  // --- LUDHIANA BLOCK ---
  {
    doctor_name: "Vipan Gupta",
    city: "Ludhiana",
    gender: "Male",
    degree: "BAMS",
    registration_details: "4159, NCISM",
    contact_number: "+91 9417067672",
    email_id: "vipangupta61@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Vijay Sharma",
    city: "Ludhiana",
    gender: "Male",
    degree: "BAMS",
    registration_details: "Verified",
    contact_number: "+91 9815391920",
    email_id: "drvijaysharm243@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Varinderjit Singh",
    city: "Ludhiana",
    gender: "Male",
    degree: "BAMS",
    registration_details: "12171, Punjab Board",
    contact_number: "+91 9041284000",
    email_id: "varinder8232@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Vanita",
    city: "Ludhiana",
    gender: "Female",
    degree: "BAMS",
    registration_details: "9226, Punjab Board",
    contact_number: "+91 9988680038",
    email_id: "vanita.batra17@gmail.com",
    work_details: "AMO, chc sahnewal",
  },
  {
    doctor_name: "Indu Gupta",
    city: "Ludhiana",
    gender: "Female",
    degree: "BAMS",
    registration_details: "6316-1, Punjab Board",
    contact_number: "+91 9217145000",
    email_id: "indugupta15474@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Gurvinder Kaur",
    city: "Ludhiana",
    gender: "Female",
    degree: "BAMS",
    registration_details: "10421, Punjab Board",
    contact_number: "+91 8146606375",
    email_id: "rajclinicpharmacy@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Gurmail Singh Dhillon",
    city: "Ludhiana",
    gender: "Male",
    degree: "BAMS",
    registration_details: "11790, Punjab Board",
    contact_number: "+91 9872521204",
    email_id: "singhgurmail21@Gmail.Com",
    work_details: "Ayurvedic medical officer, Lohgarh Dispensary",
  },

  // --- JALANDHAR BLOCK ---
  {
    doctor_name: "Yogesh Kumar",
    city: "Jalandhar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "8128, Punjab Board",
    contact_number: "+91 9872969375",
    email_id: "dr.ykarora@gmail.com",
    work_details: "AYURVEDIC MEDICAL OFFICER, Mini PHC Chitti",
  },
  {
    doctor_name: "Vivek Prasher",
    city: "Jalandhar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "6134, Punjab Board",
    contact_number: "+91 9646070016",
    email_id: "vivek.prasher@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Vishal Kumar",
    city: "Jalandhar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "9561, Punjab Board",
    contact_number: "+91 7696171961",
    email_id: "dr.vishal69@gmail.com",
    work_details: "AMO, Mehatpur PHC",
  },
  {
    doctor_name: "Vishal Bhanot",
    city: "Jalandhar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "5731, NCISM",
    contact_number: "+91 8146100500",
    email_id: "vishal.bhanot@outlook.com",
    work_details: "Advance Fertility Services IVF Centre",
  },
  {
    doctor_name: "Vipul Kakkar",
    city: "Jalandhar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "6504, NCISM",
    contact_number: "+91 7508593445",
    email_id: "vipulkakkar1@gmail.com",
    work_details: "Practicing Family Physician",
  },
  {
    doctor_name: "Vipan Kumar",
    city: "Jalandhar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "9289, Punjab Board",
    contact_number: "+91 7696396701",
    email_id: "Vipanlealh@gmail.com",
    work_details: "CHO, HWC Khaira",
  },
  {
    doctor_name: "Vinny Khanna",
    city: "Jalandhar",
    gender: "Female",
    degree: "BAMS",
    registration_details: "5815, Punjab Board",
    contact_number: "+91 9896645220",
    email_id: "khera_shelej@yahoo.co.in",
    work_details: "N/A",
  },

  // --- SANGRUR BLOCK ---
  {
    doctor_name: "Varinder Singh",
    city: "Sangrur",
    degree: "BAMS",
    registration_details: "12217, Punjab Board",
    contact_number: "+91 9803412379",
    email_id: "adammardayias@gmail.com",
    work_details: "CHO, HWC LADDA",
    gender: "Male",
  },
  {
    doctor_name: "Zulfqar",
    city: "Sangrur",
    degree: "BAMS",
    registration_details: "11837, NCISM",
    contact_number: "+91 9478961007",
    email_id: "alizulfqar749@gmail.com",
    work_details: "N/A",
    gender: "Male",
  },
  {
    doctor_name: "Yadwinder Kaur Dhindsa",
    city: "Sangrur",
    degree: "BAMS",
    registration_details: "8845, Punjab Board",
    contact_number: "+91 9417453455",
    email_id: "ParmjitSingh91681@gmail.com",
    work_details: "Ayurvedic medical officer, Civil Hospital",
    gender: "Female",
  },
  {
    doctor_name: "Ved Parkash",
    city: "Sangrur",
    degree: "BAMS",
    registration_details: "7115, Punjab Board",
    contact_number: "+91 9465731094",
    email_id: "vedparkash181159@gmai.com",
    work_details: "N/A",
    gender: "Male",
  },
  {
    doctor_name: "Vasudha Sharma",
    city: "Sangrur",
    degree: "BAMS",
    registration_details: "6248, HP Board",
    contact_number: "+91 8847308511",
    email_id: "vasudhasharma2240@gmail.com",
    work_details: "Jeevan Multispeciality Hospital",
    gender: "Female",
  },

  // --- BARNALA BLOCK ---
  {
    doctor_name: "Yugesh Goyal",
    city: "Barnala",
    gender: "Male",
    degree: "BAMS",
    registration_details: "10095, Punjab Board",
    contact_number: "+91 8146700214",
    email_id: "Goyal2627@gmail.com",
    work_details: "Ayurvedic Medical Officer, GAD Kotfatta",
  },
  {
    doctor_name: "Tanisha Singla",
    city: "Barnala",
    gender: "Female",
    degree: "BAMS",
    registration_details: "13707, Punjab Board",
    contact_number: "+91 9478793696",
    email_id: "tanishasingla696@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Sukhveer Kaur",
    city: "Barnala",
    gender: "Female",
    degree: "BAMS",
    registration_details: "13380, Punjab Board",
    contact_number: "+91 7347371531",
    email_id: "sukhveerdhaliwal531@mail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Shri Kant Garg",
    city: "Barnala",
    gender: "Male",
    degree: "BAMS",
    registration_details: "10403, Punjab Board",
    contact_number: "+91 9464871531",
    email_id: "kantgarg94@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Ricky Bansal",
    city: "Barnala",
    gender: "Male",
    degree: "BAMS",
    registration_details: "13849, Punjab Board",
    contact_number: "+91 9569350272",
    email_id: "rickybansal419@gmail.com",
    work_details: "Patiala Heart Institute (Branch)",
  },
  {
    doctor_name: "Rakesh Kumar",
    city: "Barnala",
    gender: "Male",
    degree: "BAMS",
    registration_details: "5953, Punjab Board",
    contact_number: "+91 9417329462",
    email_id: "rakeshkumartapa@gmail.com",
    work_details: "Ayurvedic Medical Officer, G.A.D khuddi Khurad",
  },

  // --- MOGA BLOCK ---
  {
    doctor_name: "Swinder Sonia",
    city: "Moga",
    gender: "Female",
    degree: "BAMS",
    registration_details: "8463, Punjab Board",
    contact_number: "+91 8146198300",
    email_id: "drsonia486@gmail.com",
    work_details: "AMO, ZAD BAHONA",
  },
  {
    doctor_name: "Suppose Maurya",
    city: "Moga",
    gender: "Male",
    degree: "BAMS, MD",
    registration_details: "N/A",
    contact_number: "+91 8284043543",
    email_id: "drsupposemaurya@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Sunil Mittal",
    city: "Moga",
    gender: "Male",
    degree: "BAMS",
    registration_details: "5584, Punjab Board",
    contact_number: "+91 9855268656",
    email_id: "drsunilmittal@hotmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Simerjit Kaur",
    city: "Moga",
    gender: "Female",
    degree: "BAMS",
    registration_details: "7476, Punjab Board",
    contact_number: "+91 8054464500",
    email_id: "simerjit125@gmail.com",
    work_details: "AYURVEDIC MEDICAL OFFICER, GAD KOT ISE KHAN",
  },
  {
    doctor_name: "Shiv Kumar Khattar",
    city: "Moga",
    gender: "Male",
    degree: "BAMS",
    registration_details: "15729, Punjab Board",
    contact_number: "+91 7307310073",
    email_id: "khattar_shiv@icloud.com",
    work_details: "N/A",
  },

  // --- PATIALA BLOCK ---
  {
    doctor_name: "Supriya Goyal",
    city: "Patiala",
    degree: "BAMS",
    registration_details: "6993, Punjab Board",
    contact_number: "+91 8146561021",
    email_id: "supriyagoyak5677@gmail.com",
    work_details: "Doctor, Jiwan Nursing Home",
    gender: "Female",
  },
  {
    doctor_name: "Swati",
    city: "Patiala",
    degree: "BAMS",
    registration_details: "14214, Punjab Board",
    contact_number: "+91 8699993083",
    email_id: "swati333dr@gmail.com",
    work_details: "L.M.O, MAHAVIR DAL CHARAITABLE HOSPITAL",
    gender: "Female",
  },
  {
    doctor_name: "Taranjeet Singh",
    city: "Patiala",
    degree: "BAMS",
    registration_details: "9611, Punjab Board",
    contact_number: "+91 9872046592",
    email_id: "taranjeets35@gmail.com",
    work_details: "STAFF NURSE, DH Mata Kaushliya Hospital",
    gender: "Male",
  },
  {
    doctor_name: "Virinder Singh",
    city: "Patiala",
    degree: "BAMS",
    registration_details: "12519, Punjab Board",
    contact_number: "+91 9644130001",
    email_id: "bpmubhadson@gmail.com",
    work_details: "Community health officer, HWC Khanoura",
    gender: "Male",
  },

  // --- RUPNAGAR BLOCK ---
  {
    doctor_name: "Suruchi Kaushal",
    city: "Rupnagar",
    gender: "Female",
    degree: "BAMS",
    registration_details: "11776, NCISM",
    contact_number: "+91 9854610008",
    email_id: "tamnakumari12@gmail.com",
    work_details: "N/A",
  },
  {
    doctor_name: "Varun Kashyap",
    city: "Rupnagar",
    gender: "Male",
    degree: "BAMS",
    registration_details: "11741, Punjab Board",
    contact_number: "+91 9463865255",
    email_id: "tarus111@gmail.com",
    work_details: "Ayurvedic Medical Officer, Dept of Health",
  },
];

// --- 2. COORDINATE LOGIC ---
const CITY_COORDS = {
  Ludhiana: { lat: 30.901, lng: 75.8573 },
  Jalandhar: { lat: 31.326, lng: 75.5762 },
  Sangrur: { lat: 30.2458, lng: 75.8421 },
  Barnala: { lat: 30.3816, lng: 75.5468 },
  Moga: { lat: 30.823, lng: 75.1734 },
  Patiala: { lat: 30.3398, lng: 76.3869 },
  Rupnagar: { lat: 30.9664, lng: 76.5331 },
  Punjab: { lat: 30.7333, lng: 75.8 }, // Default fallback
};

const processVaidyas = () => {
  return rawVaidyasData.map((v, index) => {
    // 1. Check the new explicit 'city' field first
    const cityKey = v.city || "Punjab";
    const baseCoords = CITY_COORDS[cityKey] || CITY_COORDS["Punjab"];

    // 2. Add random jitter so markers don't overlap
    const location = {
      lat: baseCoords.lat + (Math.random() * 0.04 - 0.02),
      lng: baseCoords.lng + (Math.random() * 0.04 - 0.02),
    };

    return { ...v, id: index, location };
  });
};

const processedVaidyas = processVaidyas();

// --- 3. LEAFLET CONFIG ---
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocateControl = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) map.flyTo(userLocation, 12);
  }, [userLocation, map]);

  const handleLocate = (e) => {
    e.stopPropagation();
    if (userLocation) map.flyTo(userLocation, 12);
    else alert("Location not available. Please enable permissions.");
  };
  return (
    <div className="absolute bottom-4 left-4 z-[500]">
      <button
        onClick={handleLocate}
        className="bg-white text-gray-700 p-3 rounded-full shadow-lg border-2 border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
      >
        <MdMyLocation className="text-2xl" />
      </button>
    </div>
  );
};

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 14);
  }, [center, map]);
  return null;
};

const LocationModal = ({ onEnable, status }) => {
  if (status === "found") return null;
  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {status === "denied" ? (
            <MdLocationOff className="text-3xl text-red-600" />
          ) : (
            <MdMyLocation className="text-3xl text-red-600 animate-pulse" />
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {status === "denied"
            ? "Location Access Denied"
            : "Enable Device Location"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {status === "denied"
            ? "We need location to find nearby Vaidyas."
            : "To show Vaidyas closest to you, we need access to your device location."}
        </p>
        <button
          onClick={
            status === "denied" ? () => window.location.reload() : onEnable
          }
          className={`w-full text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 ${status === "denied" ? "bg-gray-800" : "bg-[#286459]"}`}
        >
          {status === "denied" ? "Reload Page" : "📍 Enable Location"}
        </button>
      </div>
    </div>
  );
};

// --- 4. MAIN COMPONENT ---
const VaidyaLocator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedVaidya, setSelectedVaidya] = useState(null);
  const [sortedVaidyas, setSortedVaidyas] = useState(processedVaidyas);
  const [locationStatus, setLocationStatus] = useState("idle");

  const defaultCenter = [30.901, 75.8573];

  const recentFilters = [
    { id: 1, name: "Ludhiana" },
    { id: 2, name: "Jalandhar" },
    { id: 3, name: "Patiala" },
  ];

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (c * R).toFixed(1);
  };

  const requestLocation = () => {
    setLocationStatus("prompting");
    if (!navigator.geolocation) return alert("Browser not supported");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLocationStatus("found");

        const sorted = [...processedVaidyas]
          .map((v) => ({
            ...v,
            distance: calculateDistance(
              latitude,
              longitude,
              v.location.lat,
              v.location.lng,
            ),
          }))
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        setSortedVaidyas(sorted);
      },
      () => setLocationStatus("denied"),
      { enableHighAccuracy: true },
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const filteredVaidyas = sortedVaidyas.filter((v) => {
    const name = (v.doctor_name || "").toLowerCase();
    const city = (v.city || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || city.includes(query);
  });

  const handleGetDirections = (vaidya) => {
    if (!vaidya.location) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=$${vaidya.location.lat},${vaidya.location.lng}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-[#FFE4BB] flex flex-col items-center pt-5 sm:pt-10 font-sans relative">
      <LocationModal status={locationStatus} onEnable={requestLocation} />

      <header className="relative flex items-center justify-center bg-[#286459] h-14 w-[94%] max-w-7xl rounded-full px-5 my-4 shadow-xl z-20 shrink-0">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute left-2 text-white text-3xl"
        >
          {isMenuOpen ? <IoClose /> : <MdMenu />}
        </button>
        <h1 className="text-xl text-white font-semibold">Vaidya Locator</h1>
      </header>

      <section className="flex-1 w-full flex flex-col items-center pb-5">
        <div className="w-[94%] max-w-7xl bg-white/70 rounded-xl backdrop-blur-xl h-[85vh] flex flex-col p-4 gap-4 shadow-2xl border border-white/40">
          <div className="shrink-0 flex flex-col gap-3">
            <div className="w-full rounded-full bg-white/60 p-2 flex items-center gap-2 border border-red-700/30 shadow-sm">
              <div className="bg-red-700/80 rounded-full p-1.5 ml-1">
                <SearchIcon className="text-white w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by Name or City (e.g., Ludhiana)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 text-sm font-medium"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xs ml-2 font-semibold text-gray-600">
                Quick Filters:
              </h3>
              {recentFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSearchQuery(filter.name)}
                  className="px-3 py-1 bg-gray-400/20 hover:bg-[#286459] hover:text-white rounded-full text-xs font-medium transition-colors text-gray-700"
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-0 grid md:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl overflow-hidden relative shadow-inner border-2 border-red-700/20 z-0 bg-gray-100">
              <MapContainer
                center={defaultCenter}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer
                  attribution="© OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocateControl userLocation={userLocation} />
                <MapUpdater
                  center={
                    selectedVaidya && selectedVaidya.location
                      ? [
                          selectedVaidya.location.lat,
                          selectedVaidya.location.lng,
                        ]
                      : null
                  }
                />
                {userLocation && (
                  <Marker position={userLocation} title="You are here" />
                )}
                {filteredVaidyas.map((vaidya) => (
                  <Marker
                    key={vaidya.id}
                    position={[vaidya.location.lat, vaidya.location.lng]}
                    eventHandlers={{ click: () => setSelectedVaidya(vaidya) }}
                  />
                ))}
              </MapContainer>
            </div>

            <div className="rounded-xl bg-white/50 overflow-hidden flex flex-col border-2 border-red-700/20">
              {selectedVaidya ? (
                <div className="flex flex-col h-full animate-in slide-in-from-right">
                  <div className="p-4 bg-[#286459]/10 flex items-center gap-2">
                    <button onClick={() => setSelectedVaidya(null)}>
                      <MdArrowBack className="text-2xl text-[#286459]" />
                    </button>
                    <span className="font-bold text-[#286459]">
                      Back to List
                    </span>
                  </div>
                  <div className="p-6 space-y-4 overflow-y-auto flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedVaidya.doctor_name}
                    </h2>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                      {selectedVaidya.city}
                    </span>
                    <div className="space-y-3 mt-4 text-sm text-gray-700">
                      <div className="flex gap-3">
                        <Briefcase className="text-red-700 w-5 shrink-0" />{" "}
                        {selectedVaidya.work_details}
                      </div>
                      <div className="flex gap-3">
                        <FileBadge className="text-red-700 w-5 shrink-0" />{" "}
                        {selectedVaidya.registration_details}
                      </div>
                      <div className="flex gap-3">
                        <Phone className="text-red-700 w-5 shrink-0" />{" "}
                        {selectedVaidya.contact_number}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-red-700/10 flex gap-2">
                    <button
                      onClick={() => handleGetDirections(selectedVaidya)}
                      className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md flex justify-center items-center gap-2"
                    >
                      <IoLocationSharp /> Get Directions
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-gray-50 border-b">
                    <h2 className="font-bold text-gray-700">
                      Available Vaidyas ({filteredVaidyas.length})
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {filteredVaidyas.map((vaidya) => (
                      <div
                        key={vaidya.id}
                        onClick={() => setSelectedVaidya(vaidya)}
                        className="p-3 bg-white rounded-lg hover:bg-red-50 cursor-pointer flex justify-between shadow-sm transition-colors border border-transparent hover:border-red-100"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-sm">
                            {vaidya.doctor_name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate w-48">
                            {vaidya.city} • {vaidya.work_details}
                          </p>
                        </div>
                        {vaidya.distance && (
                          <span className="text-[10px] font-bold text-white bg-red-700 px-2 py-1 rounded-full h-fit self-center">
                            {vaidya.distance}km
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VaidyaLocator;
