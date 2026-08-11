// Default mock data for the Fashion Pets PZ mockup
const DEFAULT_MOCK_DATA = {
  services: [
    { id: "srv-bath", name: "Bath & Blowdry", description: "Standard bath, brush, blowdry, and ear cleaning.", baseDurationMinutes: 30, basePrice: 35 },
    { id: "srv-full", name: "Full Grooming Package", description: "Bath, blowdry, hair cut, nail trim, and styling.", baseDurationMinutes: 60, basePrice: 65 },
    { id: "srv-nails", name: "Nail Trim & Dremel", description: "Nail clipping and smoothing with a dremel tool.", baseDurationMinutes: 15, basePrice: 15 },
    { id: "srv-deshed", name: "De-Shedding Treatment", description: "Specialized undercoat blowout and brush out.", baseDurationMinutes: 45, basePrice: 50 },
    { id: "srv-teeth", name: "Teeth Brushing & Breath Spray", description: "Dental brushing and enzymatic breath refreshing.", baseDurationMinutes: 15, basePrice: 12 },
    { id: "srv-cat-groom", name: "Feline Grooming Package", description: "Specialized cat bath, comb-out, and sanitary trim.", baseDurationMinutes: 60, basePrice: 75 }
  ],
  users: [
    { id: "usr-admin", name: "Clara Davis (Admin)", role: "administrator", color: "#8b5cf6" },
    { id: "usr-marcus", name: "Marcus Thorne (Senior Groomer)", role: "groomer", color: "#3b82f6" },
    { id: "usr-sarah", name: "Sarah Connor (Groomer)", role: "groomer", color: "#10b981" },
    { id: "usr-dave", name: "Dave Miller (Accountant)", role: "accountant", color: "#f59e0b" }
  ],
  customers: [
    { id: "cust-1", fullName: "Alice Watson", phone: "555-0199", email: "alice@example.com", notes: "Prefers Marcus as groomer. Dog gets car sick." },
    { id: "cust-2", fullName: "Robert Marley", phone: "555-0420", email: "bob@example.com", notes: "Always pays via Bank Transfer." },
    { id: "cust-3", fullName: "Emily Thorne", phone: "555-0777", email: "emily@example.com", notes: "Dog is very sensitive around paws." },
    { id: "cust-4", fullName: "Jonathan Garcia", phone: "555-9876", email: "jon@example.com", notes: "Punctual customer." }
  ],
  pets: [
    { id: "pet-1", customerId: "cust-1", name: "Max", species: "Dog", breed: "Golden Retriever", size: "Large", age: "3 years", allergies: "Wheat, Beef", behaviorNotes: "Friendly, loves water.", activeStatus: "active" },
    { id: "pet-2", customerId: "cust-2", name: "Ziggy", species: "Dog", breed: "Standard Poodle", size: "Medium", age: "2 years", allergies: "None", behaviorNotes: "Nervous, hates blowdryers.", activeStatus: "active" },
    { id: "pet-3", customerId: "cust-3", name: "Bella", species: "Dog", breed: "Chihuahua", size: "Small", age: "5 years", allergies: "Chicken", behaviorNotes: "Nippy when paws are touched.", activeStatus: "active" },
    { id: "pet-4", customerId: "cust-4", name: "Sylvester", species: "Cat", breed: "Domestic Shorthair", size: "Medium", age: "4 years", allergies: "None", behaviorNotes: "Calm but dislikes water.", activeStatus: "active" }
  ],
  appointments: []
};

// Generate initial appointments dynamically relative to current date so calendar looks populated
function generateMockAppointments(customers, pets, services, users) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // Helper to format time
  const getISOString = (hours, minutes) => {
    return new Date(year, month, date, hours, minutes).toISOString();
  };

  return [
    {
      id: "apt-1",
      customerId: "cust-1",
      petId: "pet-1",
      serviceId: "srv-full",
      assignedUserId: "usr-marcus",
      startAt: getISOString(9, 0), // 09:00 AM
      durationMinutes: 75, // base (60) + Large dog size adjustment (15)
      status: "completed",
      depositAmount: 20,
      notes: "Zeus haircut was perfect last time. Do the same.",
      paymentStatus: "paid",
      paymentAmount: 80, // Price: $65 (base) + $15 (size)
      paymentMethod: "Card"
    },
    {
      id: "apt-2",
      customerId: "cust-2",
      petId: "pet-2",
      serviceId: "srv-bath",
      assignedUserId: "usr-sarah",
      startAt: getISOString(10, 30), // 10:30 AM
      durationMinutes: 40, // base (30) + Medium dog size adjustment (10)
      status: "in-progress",
      depositAmount: 10,
      notes: "Be gentle around ears.",
      paymentStatus: "pending",
      paymentAmount: 45, // $35 + $10
      paymentMethod: ""
    },
    {
      id: "apt-3",
      customerId: "cust-3",
      petId: "pet-3",
      serviceId: "srv-nails",
      assignedUserId: "usr-marcus",
      startAt: getISOString(12, 0), // 12:00 PM
      durationMinutes: 20, // base (15) + Small dog adjustment (5)
      status: "checked-in",
      depositAmount: 0,
      notes: "Muzzle if she gets too nippy.",
      paymentStatus: "pending",
      paymentAmount: 20, // $15 + $5
      paymentMethod: ""
    },
    {
      id: "apt-4",
      customerId: "cust-4",
      petId: "pet-4",
      serviceId: "srv-cat-groom",
      assignedUserId: "usr-sarah",
      startAt: getISOString(14, 0), // 02:00 PM
      durationMinutes: 70, // base (60) + Cat adjustment (10)
      status: "scheduled",
      depositAmount: 15,
      notes: "Dry cage only, no blaster.",
      paymentStatus: "pending",
      paymentAmount: 85, // $75 + $10
      paymentMethod: ""
    }
  ];
}

// Attach mock data to global scope for mockup script load
window.DEFAULT_MOCK_DATA = DEFAULT_MOCK_DATA;
window.generateMockAppointments = generateMockAppointments;
