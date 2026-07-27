"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { Order } from "../../types";

export default function ProfilePage() {
  const router = useRouter();
  const { ordersHistory, addresses, setSelectedAddress, addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "settings">("orders");
  
  // Profile local state
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Address add local state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newLabel, setNewLabel] = useState("Home");
  const [newName, setNewName] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newApartment, setNewApartment] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setSavingSettings(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      // Add each item to cart
      addToCart(item.product);
    });
    router.push("/cart");
  };

  return (
    <div className="min-h-screen px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-8">
      
      {/* Profile Header section - Matte Glass panel */}
      <section className="paper-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-outline-variant/30 shadow-sm mb-8">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-leaf-green/10 flex items-center justify-center text-leaf-green border-4 border-white shadow-md text-3xl font-extrabold select-none shrink-0 font-literata">
          JD
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="font-literata text-xl md:text-2xl text-forest-deep">{name}</h2>
            <span className="inline-block self-center md:self-auto px-2.5 py-0.5 rounded-full bg-leaf-green/10 text-leaf-green font-bold text-[10px] uppercase tracking-wider font-plus-jakarta">
              Premium Member
            </span>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant font-medium font-plus-jakarta">{email} • {phone}</p>
          <p className="text-[11px] text-outline font-semibold mt-2 font-plus-jakarta">Member since July 2024</p>
        </div>
      </section>

      {/* Main Content splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start font-plus-jakarta">
        
        {/* Navigation Sidebar Tabs (Span 3) */}
        <aside className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto hide-scrollbar -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 pb-2 lg:pb-0 select-none">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === "orders"
                ? "bg-forest-deep text-white shadow-sm"
                : "bg-white/80 text-on-surface-variant hover:bg-white border border-outline-variant/30"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            <span>Order History</span>
          </button>
          
          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === "addresses"
                ? "bg-forest-deep text-white shadow-sm"
                : "bg-white/80 text-on-surface-variant hover:bg-white border border-outline-variant/30"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <span>My Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === "settings"
                ? "bg-forest-deep text-white shadow-sm"
                : "bg-white/80 text-on-surface-variant hover:bg-white border border-outline-variant/30"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Account Settings</span>
          </button>
        </aside>

        {/* Tab Detail Pane (Span 9) */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-on-surface">Order History</h3>
                <span className="text-xs text-on-surface-variant font-semibold">
                  {ordersHistory.length} orders total
                </span>
              </div>

              {ordersHistory.length === 0 ? (
                /* Empty state */
                <div className="bg-white/50 border border-white rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[36px]">receipt_long</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">No orders placed yet</h4>
                    <p className="text-xs md:text-sm text-on-surface-variant max-w-[280px] mt-1">
                      You haven&apos;t completed any purchases in this session yet. Go shop some fresh vegetables!
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/")}
                    className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-transform"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                /* Order list cards */
                <div className="space-y-4">
                  {ordersHistory.map(order => (
                    <div
                      key={order.id}
                      className="bg-white/80 backdrop-blur-lg border border-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {/* Top banner */}
                      <div className="flex justify-between items-start border-b border-outline-variant/15 pb-4 mb-4 flex-wrap gap-2">
                        <div className="space-y-1">
                          <span className="block text-xs font-bold text-outline uppercase tracking-wide">Order placed</span>
                          <p className="text-sm font-extrabold text-on-surface">{order.id}</p>
                          <span className="block text-[10px] text-on-surface-variant font-medium">
                            {new Date(order.createdAt).toLocaleDateString(undefined, { 
                              year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                            })}
                          </span>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="block text-xs font-bold text-outline uppercase tracking-wide">Total amount</span>
                          <p className="text-sm font-extrabold text-primary">₹{order.total.toFixed(2)}</p>
                          {/* Order Status Badge */}
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] capitalize tracking-wide">
                            {order.status === "pending" ? "Active" : order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items previews */}
                      <div className="flex gap-4 items-center overflow-x-auto hide-scrollbar py-1">
                        {order.items.map(item => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-2 bg-surface-container-low/50 border border-outline-variant/10 rounded-xl p-2 shrink-0 max-w-[200px]"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white shrink-0 overflow-hidden relative flex items-center justify-center border border-outline-variant/10">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-xs text-on-surface truncate leading-tight">
                                {item.product.name}
                              </p>
                              <p className="text-[10px] text-on-surface-variant">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="border-t border-outline-variant/15 pt-4 mt-4 flex items-center justify-between flex-wrap gap-3">
                        <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-outline">local_shipping</span>
                          Delivering to: <strong className="text-on-surface font-semibold">{order.address.label}</strong> ({order.deliverySlot.label})
                        </p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReorder(order)}
                            className="px-4 py-2 text-xs font-bold rounded-lg border border-primary/20 text-primary hover:bg-primary/5 active:scale-95 transition-all"
                          >
                            Reorder Items
                          </button>
                          <button
                            onClick={() => router.push(`/track-order?id=${order.id}`)}
                            className="px-4 py-2 text-xs font-bold rounded-lg bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all shadow-sm"
                          >
                            Track Order
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-on-surface">Manage Addresses</h3>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add New</span>
                </button>
              </div>

              {/* Add Address Form mockup */}
              {showAddAddress && (
                <div className="bg-white/80 border border-white rounded-2xl p-5 shadow-sm space-y-4 animate-slide-up">
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                    <h4 className="font-bold text-sm text-on-surface">Add Delivery Address</h4>
                    <button onClick={() => setShowAddAddress(false)} className="text-on-surface-variant hover:text-error">
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                    <div className="space-y-1">
                      <label className="font-bold text-on-surface-variant">Label (e.g. Home, Office)</label>
                      <input
                        type="text"
                        value={newLabel}
                        onChange={e => setNewLabel(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-on-surface-variant">Recipient Name</label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="font-bold text-on-surface-variant">Street Address</label>
                      <input
                        type="text"
                        placeholder="123 Farm Lane"
                        value={newStreet}
                        onChange={e => setNewStreet(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-on-surface-variant">Apartment/Suite</label>
                      <input
                        type="text"
                        placeholder="Apt 4B"
                        value={newApartment}
                        onChange={e => setNewApartment(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-on-surface-variant">City</label>
                      <input
                        type="text"
                        placeholder="San Francisco"
                        value={newCity}
                        onChange={e => setNewCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-on-surface-variant">Zip Code</label>
                      <input
                        type="text"
                        placeholder="94110"
                        value={newZip}
                        onChange={e => setNewZip(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-on-surface-variant">Phone Number</label>
                      <input
                        type="text"
                        placeholder="(555) 000-0000"
                        value={newPhone}
                        onChange={e => setNewPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-outline-variant/30 hover:bg-black/5 text-on-surface-variant font-bold text-xs rounded-lg active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert("Address added to your session directory.");
                        setShowAddAddress(false);
                      }}
                      className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-hover active:scale-95 transition-all"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}

              {/* Address card listing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className="bg-white/80 border border-white rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            {addr.label.toLowerCase() === "home" ? "home" : "business"}
                          </span>
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.25 rounded-md">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        <strong>{addr.name}</strong><br />
                        {addr.street}, {addr.apartment}<br />
                        {addr.city}, {addr.zipCode}
                      </p>
                      <p className="text-[11px] text-outline font-semibold mt-1">Phone: {addr.phone}</p>
                    </div>

                    <div className="border-t border-outline-variant/15 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-primary flex items-center gap-0.5">
                        {addr.expressEligible ? (
                          <>
                            <span className="material-symbols-outlined text-[14px]">bolt</span>
                            Eligible for Express
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[14px]">info</span>
                            Standard Shipping only
                          </>
                        )}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => alert("Address edit forms will link to NestJS database updates.")}
                          className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-outline transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ACCOUNT SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-on-surface">Account Settings</h3>
              
              <form onSubmit={handleSaveSettings} className="bg-white/80 border border-white rounded-3xl p-6 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="space-y-1">
                    <label className="font-bold text-on-surface-variant">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="font-bold text-on-surface-variant">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-on-surface-variant">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-on-surface-variant">Store Membership Tier</label>
                    <input
                      type="text"
                      disabled
                      value="Premium Organic Enthusiast"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-outline outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/15 pt-4 mt-6">
                  {saveSuccess && (
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Profile settings saved successfully!
                    </span>
                  )}
                  <div className="w-1" />
                  
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-6 py-3 bg-primary text-on-primary hover:bg-primary-hover active:scale-95 transition-all font-bold text-xs md:text-sm rounded-xl shadow-md flex items-center gap-1.5 btn-glow"
                  >
                    {savingSettings && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
