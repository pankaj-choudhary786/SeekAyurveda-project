import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// Leaflet Icon Fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Icons
import { IoClose, IoLocationSharp } from "react-icons/io5";
import {
  MdMenu,
  MdArrowBack,
  MdMyLocation,
  MdLocationOff,
} from "react-icons/md";
import { SearchIcon, Award, Phone, MapPin } from "lucide-react";
import { vaidyas } from "../data/vaidyas";

// Fix for default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Components ---

// 1. Locate Me Button (Bottom Left)
const LocateControl = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 14, { animate: true, duration: 1.5 });
    }
  }, [userLocation, map]);

  const handleLocate = (e) => {
    e.stopPropagation();
    if (userLocation) {
      map.flyTo(userLocation, 14, { animate: true, duration: 1.5 });
    } else {
      alert("Location not available. Please enable permissions.");
    }
  };
  return (
    <div className="absolute bottom-4 left-4 z-[500]">
      <button
        onClick={handleLocate}
        className="bg-white text-gray-700 p-3 rounded-full shadow-lg border-2 border-gray-200 hover:bg-gray-50 hover:text-[#286459] transition-all active:scale-95"
        title="Go to my location"
      >
        <MdMyLocation className="text-2xl" />
      </button>
    </div>
  );
};

// 2. Map Updater
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// --- NEW: Location Permission Modal ---
const LocationModal = ({ onEnable, status }) => {
  if (status === "found") return null; // Hide if found

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
            ? "We cannot find nearby Vaidyas without your location. Please enable location access in your browser settings."
            : "To show Vaidyas closest to you, we need access to your device location."}
        </p>

        {status === "denied" ? (
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors"
          >
            I've Enabled It, Reload Page
          </button>
        ) : (
          <button
            onClick={onEnable}
            className="w-full bg-[#286459] text-white font-bold py-3 rounded-xl shadow-lg hover:bg-[#1e4b43] transition-transform active:scale-95"
          >
            📍 Enable Location
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---
const VaidyaLocator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedVaidya, setSelectedVaidya] = useState(null);
  const [sortedVaidyas, setSortedVaidyas] = useState(vaidyas);

  // Status: 'idle' | 'prompting' | 'found' | 'denied'
  const [locationStatus, setLocationStatus] = useState("idle");

  const defaultCenter = [20.5937, 78.9629];

  const recentFilters = [
    { id: 1, name: "Vata Specialist" },
    { id: 2, name: "Pitta Balance" },
    { id: 3, name: "Sleep Disorder" },
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

  // Function called by the Modal Button
  const requestLocation = () => {
    setLocationStatus("prompting");
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLocationStatus("found");

        // Sort data
        const sorted = [...vaidyas]
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
      (error) => {
        console.error("Location error:", error);
        setLocationStatus("denied");
      },
      { enableHighAccuracy: true },
    );
  };

  // OPTIONAL: Auto-trigger on mount?
  // Comment this out if you strictly want them to click the button first.
  // Currently, it will show the modal, but if the browser has saved permissions, it might auto-resolve.
  useEffect(() => {
    requestLocation();
  }, []);

  const filteredVaidyas = sortedVaidyas.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.speciality.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleGetDirections = (vaidya) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${vaidya.location.lat},${vaidya.location.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFE4BB] flex flex-col items-center pt-5 sm:pt-10 font-sans relative">
      {/* 3. Render the Modal */}
      <LocationModal status={locationStatus} onEnable={requestLocation} />

      {/* HEADER */}
      <header className="relative flex items-center justify-center bg-[#286459] h-14 w-[94%] max-w-7xl rounded-full px-5 my-4 shadow-xl z-20 shrink-0">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute left-2 text-white text-3xl"
        >
          {isMenuOpen ? <IoClose /> : <MdMenu />}
        </button>
        <h1 className="text-xl text-white font-semibold">Vaidya Locator</h1>
      </header>

      {/* MAIN SECTION */}
      <section className="flex-1 w-full flex flex-col items-center pb-5">
        <div className="w-[94%] max-w-7xl bg-white/70 rounded-xl backdrop-blur-xl h-[85vh] flex flex-col p-4 gap-4 shadow-2xl border border-white/40">
          {/* SEARCH & FILTERS */}
          <div className="shrink-0 flex flex-col gap-3">
            <div className="w-full rounded-full bg-white/60 p-2 flex items-center gap-2 border border-red-700/30 shadow-sm">
              <div className="bg-red-700/80 rounded-full p-1.5 ml-1">
                <SearchIcon className="text-white w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by Specialization or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 text-sm font-medium"
              />
            </div>

            <div>
              <h3 className="text-xs ml-2 mb-2 font-semibold text-gray-600">
                Recent Searches:
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {recentFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSearchQuery(filter.name)}
                    className="px-3 py-1 bg-gray-400/20 ring-1 ring-gray-400/10 hover:bg-[#286459] hover:text-white backdrop-blur-md rounded-full text-xs font-medium transition-colors text-gray-700"
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 grid md:grid-cols-2 gap-4 mt-2">
            {/* MAP */}
            <div className="rounded-xl overflow-hidden relative shadow-inner border-2 border-red-700/20 z-0 bg-gray-100">
              <MapContainer
                center={defaultCenter}
                zoom={5}
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
                    selectedVaidya
                      ? [
                          selectedVaidya.location.lat,
                          selectedVaidya.location.lng,
                        ]
                      : null
                  }
                  zoom={selectedVaidya ? 14 : null}
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

            {/* RIGHT: DETAILS PANEL */}
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
                      {selectedVaidya.name}
                    </h2>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                      {selectedVaidya.speciality}
                    </span>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Award className="text-red-700 w-5" />{" "}
                        {selectedVaidya.experience}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="text-red-700 w-5" />{" "}
                        {selectedVaidya.address}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="text-red-700 w-5" />{" "}
                        {selectedVaidya.mobile}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-red-700/10 flex gap-2">
                    <button className="flex-1 bg-red-700 text-white py-2 rounded-full font-bold shadow-md text-sm">
                      Book Slot
                    </button>
                    <button
                      onClick={() => handleGetDirections(selectedVaidya)}
                      className="flex-1 bg-black text-white py-2 rounded-full font-bold shadow-md flex justify-center items-center gap-2 text-sm"
                    >
                      <IoLocationSharp /> Directions
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-gray-50 border-b">
                    <h2 className="font-bold text-gray-700">
                      Nearby Vaidyas ({filteredVaidyas.length})
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {filteredVaidyas.map((vaidya) => (
                      <div
                        key={vaidya.id}
                        onClick={() => setSelectedVaidya(vaidya)}
                        className="p-3 bg-white rounded-lg hover:bg-red-50 cursor-pointer flex justify-between shadow-sm transition-colors border border-transparent hover:border-red-100"
                      >
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">
                            {vaidya.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {vaidya.speciality}
                          </p>
                        </div>
                        {vaidya.distance && (
                          <span className="text-[10px] font-bold text-white bg-red-700 px-2 py-1 rounded-full h-fit">
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
