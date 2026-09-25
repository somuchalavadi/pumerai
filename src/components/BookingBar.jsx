import { useEffect, useState, useId } from "react";
import { rooms } from "../data/rooms.js";

const ROOM_OPTIONS = [
  { id: "all", name: "All Room Types" },
  ...rooms.map((r) => ({
    id: r.slug,
    name: r.name,
    size: r.size,
    capacity: r.occupancy,
  })),
];

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateString() {
  return formatLocalDate(new Date());
}

function getOffsetDateString(baseDateStr, offsetDays = 1) {
  let d;
  if (baseDateStr && typeof baseDateStr === "string") {
    const parts = baseDateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      d = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      d = new Date();
    }
  } else {
    d = new Date();
  }
  d.setDate(d.getDate() + offsetDays);
  return formatLocalDate(d);
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || isNaN(parts[0])) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  const day = d.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return `${day} ${months[d.getMonth()]}`;
}

export default function BookingBar({ initialRoom = null, isHomeSection = false }) {
  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();
  const roomId = useId();

  const todayStr = getTodayDateString();
  const [checkIn, setCheckIn] = useState(() => getTodayDateString());
  const [checkOut, setCheckOut] = useState(() => getOffsetDateString(getTodayDateString(), 1));
  const [guests, setGuests] = useState("2 Adults");
  const [selectedRoom, setSelectedRoom] = useState(initialRoom || "all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("select");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Listen for global custom events to trigger booking modal from any card or CTA
  useEffect(() => {
    const handleOpenBooking = (event) => {
      if (event.detail?.room) {
        setSelectedRoom(event.detail.room);
        setModalStep("request");
      } else {
        setSelectedRoom("all");
        setModalStep("select");
      }
      setIsModalOpen(true);
    };

    window.addEventListener("pumerai:open-booking", handleOpenBooking);
    return () => window.removeEventListener("pumerai:open-booking", handleOpenBooking);
  }, []);

  // Handle Check-In selection: cannot be before today, and if checkOut <= newCheckIn, auto-advance checkOut
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    if (!newCheckIn) return;
    const effectiveCheckIn = newCheckIn < todayStr ? todayStr : newCheckIn;
    setCheckIn(effectiveCheckIn);

    if (checkOut <= effectiveCheckIn) {
      setCheckOut(getOffsetDateString(effectiveCheckIn, 1));
    }
  };

  // Handle Check-Out selection: cannot be before or equal to checkIn
  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    if (!newCheckOut) return;
    const minCheckOut = getOffsetDateString(checkIn, 1);
    if (newCheckOut < minCheckOut) {
      setCheckOut(minCheckOut);
    } else {
      setCheckOut(newCheckOut);
    }
  };

  // Calculate nights
  const calculateNights = (inDate, outDate) => {
    if (!inDate || !outDate) return 1;
    const parts1 = inDate.split("-").map(Number);
    const parts2 = outDate.split("-").map(Number);
    if (parts1.length !== 3 || parts2.length !== 3) return 1;
    const t1 = new Date(parts1[0], parts1[1] - 1, parts1[2]).getTime();
    const t2 = new Date(parts2[0], parts2[1] - 1, parts2[2]).getTime();
    const diff = Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff || 1);
  };

  const nights = calculateNights(checkIn, checkOut);

  const matchedRoom = ROOM_OPTIONS.find((r) => r.id === selectedRoom) || ROOM_OPTIONS[0];

  // Format WhatsApp Link
  const buildWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hello Hotel Pumerai! I would like to check availability and book direct:\n` +
      `• Room: ${matchedRoom.name}\n` +
      `• Check-In: ${checkIn}\n` +
      `• Check-Out: ${checkOut} (${nights} night${nights > 1 ? "s" : ""})\n` +
      `• Guests: ${guests}\n` +
      `• Inclusions: Free Breakfast Buffet, WiFi, Pool & Parking\n` +
      `Please confirm best available rate and reservation details. Thank you!`
    );
    return `https://wa.me/919845423223?text=${message}`;
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetModal = () => {
    setIsSubmitted(false);
    setIsModalOpen(false);
    setModalStep("select");
  };

  return (
    <>
      {/* Unified Responsive Booking Bar (Desktop & Mobile) */}
      <aside className={`sticky-booking-bar ${isHomeSection ? "booking-bar-home" : ""}`} aria-label="Quick Room Availability & Booking">
        <div className="booking-bar-inner">
          {/* Desktop Layout (min-width: 900px) */}
          <div className="booking-desktop-view">
            {/* Trust Badge */}
            <div className="booking-trust-badge" title="Verified rating on Google Stays">
              <div className="rating-pill">
                <span className="rating-score">4.7 / 5</span>
                <span className="rating-label">GOOGLE RATED</span>
              </div>
              <span className="trust-divider">|</span>
              <span className="trust-perk">Direct WhatsApp Booking</span>
            </div>

            {/* Form Fields */}
            <div className="booking-inputs-group">
              <div className="booking-field">
                <label
                  htmlFor={checkInId}
                  className="booking-label"
                  onClick={() => {
                    try {
                      document.getElementById(checkInId)?.showPicker?.();
                    } catch {}
                  }}
                >
                  CHECK-IN
                </label>
                <input
                  id={checkInId}
                  type="date"
                  min={todayStr}
                  value={checkIn}
                  onChange={handleCheckInChange}
                  onClick={(e) => {
                    try {
                      e.target.showPicker?.();
                    } catch {}
                  }}
                  className="booking-input"
                />
              </div>

              <div className="booking-field">
                <label
                  htmlFor={checkOutId}
                  className="booking-label"
                  onClick={() => {
                    try {
                      document.getElementById(checkOutId)?.showPicker?.();
                    } catch {}
                  }}
                >
                  CHECK-OUT
                </label>
                <input
                  id={checkOutId}
                  type="date"
                  min={getOffsetDateString(checkIn, 1)}
                  value={checkOut}
                  onChange={handleCheckOutChange}
                  onClick={(e) => {
                    try {
                      e.target.showPicker?.();
                    } catch {}
                  }}
                  className="booking-input"
                />
              </div>

              <div className="booking-field">
                <label htmlFor={guestsId} className="booking-label">
                  GUESTS
                </label>
                <select
                  id={guestsId}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="booking-input booking-select"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="3 Adults">3 Adults</option>
                  <option value="4+ Family">4+ Family</option>
                </select>
              </div>

              <div className="booking-field booking-room-field">
                <label htmlFor={roomId} className="booking-label">
                  ROOM TYPE
                </label>
                <select
                  id={roomId}
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="booking-input booking-select"
                >
                  {ROOM_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action CTA */}
            <div className="booking-action">
              <button
                type="button"
                className="button-primary booking-submit-btn"
                onClick={() => {
                  setModalStep("request");
                  setIsModalOpen(true);
                }}
                aria-label="Check Room Availability and Rates"
              >
                <span>CHECK AVAILABILITY</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Layout (max-width: 899px) - Compact Mobile Widget matching Reference */}
          <div className="booking-mobile-view">
            <div className="booking-mobile-content">
              <div className="mobile-dates-row">
                <span
                  className="mobile-dates-tag"
                  onClick={() => {
                    try {
                      document.getElementById("mobile-checkin-date")?.showPicker?.();
                    } catch {}
                  }}
                >
                  DATES
                </span>
                <div className="mobile-dates-range">
                  <label className="mobile-date-label-field" title="Tap to select Check-in date">
                    <span className="mobile-date-text">{formatDisplayDate(checkIn)}</span>
                    <input
                      id="mobile-checkin-date"
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={handleCheckInChange}
                      onClick={(e) => {
                        try {
                          e.target.showPicker?.();
                        } catch {}
                      }}
                      className="mobile-native-date-input"
                      aria-label="Select Check-in Date"
                    />
                  </label>
                  <span className="mobile-date-dash">&ndash;</span>
                  <label className="mobile-date-label-field" title="Tap to select Check-out date">
                    <span className="mobile-date-text">{formatDisplayDate(checkOut)}</span>
                    <input
                      id="mobile-checkout-date"
                      type="date"
                      min={getOffsetDateString(checkIn, 1)}
                      value={checkOut}
                      onChange={handleCheckOutChange}
                      onClick={(e) => {
                        try {
                          e.target.showPicker?.();
                        } catch {}
                      }}
                      className="mobile-native-date-input"
                      aria-label="Select Check-out Date"
                    />
                  </label>
                </div>
              </div>

              <div className="mobile-meta-row">
                <span className="mobile-rating-pill">4.7 / 5</span>
                <span className="mobile-nights-text">{nights} {nights > 1 ? "Nights" : "Night"}</span>
              </div>
            </div>

            <button
              type="button"
              className="button-primary mobile-check-dates-btn"
              onClick={() => {
                setModalStep("select");
                setIsModalOpen(true);
              }}
              aria-label="Check Room Availability for Selected Dates"
            >
              CHECK DATES
            </button>
          </div>
        </div>
      </aside>

      {/* Interactive Availability & Direct Booking Modal */}
      {isModalOpen && (
        <div className="booking-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="booking-modal-backdrop" onClick={handleResetModal} />
          <div className="booking-modal-content">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleResetModal}
              aria-label="Close availability window"
            >
              &times;
            </button>

            {!isSubmitted ? (
              modalStep === "select" ? (
                /* Step 1: Select Stay Details */
                <div className="modal-select-step">
                  <div className="editorial-tag">
                    <span className="accent-pip" />
                    <span>HOTEL PUMERAI &bull; RESERVATION DETAILS</span>
                  </div>
                  <h3 id="modal-title" className="modal-title">
                    Select Your Stay Details
                  </h3>
                  <p className="modal-subtitle">
                    Choose your check-in, check-out, number of guests, and room type to check availability.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalStep("request");
                    }}
                    className="modal-select-form"
                  >
                    <div className="modal-form-grid-2">
                      <div className="form-group">
                        <label htmlFor="modal-checkin">Check-In Date *</label>
                        <input
                          id="modal-checkin"
                          type="date"
                          min={todayStr}
                          value={checkIn}
                          onChange={handleCheckInChange}
                          required
                          className="modal-form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="modal-checkout">Check-Out Date *</label>
                        <input
                          id="modal-checkout"
                          type="date"
                          min={getOffsetDateString(checkIn, 1)}
                          value={checkOut}
                          onChange={handleCheckOutChange}
                          required
                          className="modal-form-input"
                        />
                      </div>
                    </div>

                    <div className="modal-form-grid-2">
                      <div className="form-group">
                        <label htmlFor="modal-guests">Number of Guests *</label>
                        <select
                          id="modal-guests"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="modal-form-input modal-form-select"
                        >
                          <option value="1 Adult">1 Adult</option>
                          <option value="2 Adults">2 Adults</option>
                          <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                          <option value="3 Adults">3 Adults</option>
                          <option value="4+ Family">4+ Family</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="modal-room">Room Type *</label>
                        <select
                          id="modal-room"
                          value={selectedRoom}
                          onChange={(e) => setSelectedRoom(e.target.value)}
                          className="modal-form-input modal-form-select"
                        >
                          {ROOM_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="modal-select-actions">
                      <button type="submit" className="button-primary modal-check-btn">
                        <span>CHECK AVAILABILITY</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Step 2: Exact Reservation Request Details & Inquiry */
                <div className="modal-body-grid">
                  {/* Left Col: Stay Calculation & Direct Perks */}
                  <div className="modal-summary-col">
                    <div className="editorial-tag">
                      <span className="accent-pip" />
                      <span>HOTEL PUMERAI &bull; DIRECT BENEFIT</span>
                    </div>
                    <h3 id="modal-title" className="modal-title">
                      Check Availability &amp; Reserve Direct
                    </h3>
                    <p className="modal-subtitle">
                      NH-66, near Ramateertha Cross, Honnavar, Karnataka 581334
                    </p>

                    <div className="modal-calc-card">
                      <div className="calc-header-row">
                        <span className="calc-card-title">YOUR RESERVATION DETAILS</span>
                        <button
                          type="button"
                          className="calc-edit-btn"
                          onClick={() => setModalStep("select")}
                          title="Edit dates, guests, or room"
                        >
                          Edit Details &rarr;
                        </button>
                      </div>
                      <div className="calc-row">
                        <span className="calc-label">Selected Room</span>
                        <span className="calc-val">{matchedRoom.name}</span>
                      </div>
                      <div className="calc-row">
                        <span className="calc-label">Stay Dates</span>
                        <span className="calc-val">
                          {checkIn} to {checkOut} ({nights} night{nights > 1 ? "s" : ""})
                        </span>
                      </div>
                      <div className="calc-row">
                        <span className="calc-label">Occupancy</span>
                        <span className="calc-val">{guests}</span>
                      </div>
                      <div className="calc-divider" />
                      <div className="reservation-badge-note">
                        <span>✓ Direct Front Desk Reservation Request</span>
                      </div>
                    </div>

                  <div className="modal-inclusions-list">
                    <span className="inclusions-heading">ALL DIRECT BOOKINGS INCLUDE:</span>
                    <ul>
                      <li>
                        <span className="check-icon">&#x2713;</span>
                        <span>Complimentary daily breakfast buffet at Matsya / Madhura</span>
                      </li>
                      <li>
                        <span className="check-icon">&#x2713;</span>
                        <span>Free high-speed WiFi (100+ Mbps) throughout the property</span>
                      </li>
                      <li>
                        <span className="check-icon">&#x2713;</span>
                        <span>Access to indoor swimming pool &amp; children&apos;s pool (6:30 AM–7:00 PM)</span>
                      </li>
                      <li>
                        <span className="check-icon">&#x2713;</span>
                        <span>Free secured on-site self parking with 24-hr surveillance</span>
                      </li>
                      <li>
                        <span className="check-icon">&#x2713;</span>
                        <span>Flexible free cancellation up to 24 hours prior to check-in</span>
                      </li>
                    </ul>
                  </div>

                  <div style={{ marginTop: "16px" }}>
                    <a
                      href="https://maps.app.goo.gl/rCfTnw9t8Dp58mga7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary"
                      style={{ fontSize: "0.72rem", padding: "8px 14px", width: "100%", textAlign: "center" }}
                    >
                      📍 Get Driving Directions on Google Maps
                    </a>
                  </div>
                </div>

                {/* Right Col: Instant Booking Actions & Form */}
                <div className="modal-actions-col">
                  {/* Instant WhatsApp & Phone Actions */}
                  <div className="instant-contact-actions">
                    <span className="instant-label">FASTEST BOOKING CHANNELS:</span>
                    <a
                      href={buildWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-whatsapp-instant"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span>Book Instantly on WhatsApp</span>
                    </a>

                    <a href="tel:+919845423223" className="button-call-instant">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>Call Reservations (+91 98454 23223)</span>
                    </a>
                  </div>

                  <div className="or-divider">
                    <span>OR SEND RESERVATION REQUEST</span>
                  </div>

                  {/* Direct Inquiry Form */}
                  <form onSubmit={handleSubmitInquiry} className="modal-booking-form">
                    <div className="form-group">
                      <label htmlFor="guest-name">Full Name *</label>
                      <input
                        id="guest-name"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Hegde"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="modal-form-input"
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="guest-phone">Phone / Mobile *</label>
                        <input
                          id="guest-phone"
                          type="tel"
                          required
                          placeholder="+91 98450 00000"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="modal-form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="guest-email">Email (Optional)</label>
                        <input
                          id="guest-email"
                          type="email"
                          placeholder="you@domain.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="modal-form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="guest-requests">Special Requests / ETA</label>
                      <input
                        id="guest-requests"
                        type="text"
                        placeholder="e.g. Late check-in, pool view, extra bed"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="modal-form-input"
                      />
                    </div>

                    <button type="submit" className="button-primary modal-submit-btn">
                      REQUEST CONFIRMATION
                    </button>
                    <p className="form-secure-note">
                      🔒 No immediate payment required. Our front desk will confirm within 15 minutes.
                    </p>
                  </form>
                </div>
              </div>
            )
          ) : (
              /* Success / Submission Confirmation State */
              <div className="modal-success-screen">
                <div className="success-icon">&#x2713;</div>
                <h3 className="success-title">Reservation Request Received</h3>
                <p className="success-copy">
                  Thank you, <strong>{guestName || "Guest"}</strong>! We have received your inquiry for the{" "}
                  <strong>{matchedRoom.name}</strong> from <strong>{checkIn}</strong> to <strong>{checkOut}</strong>.
                </p>
                <div className="success-summary-box">
                  <p>Our front desk at NH-66 Honnavar will contact you at <strong>{guestPhone}</strong> shortly with your confirmed booking voucher and direct reservation details.</p>
                </div>
                <div className="success-actions">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-whatsapp-instant"
                  >
                    Send Instant WhatsApp Copy
                  </a>
                  <button type="button" className="button-secondary" onClick={handleResetModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
