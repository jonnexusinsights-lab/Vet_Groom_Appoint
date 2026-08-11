// State Management for Fashion Pets PZ Mockup (Light SaaS Theme with Lucide & Chart.js)
class MockupApp {
  constructor() {
    this.state = {
      services: [],
      users: [],
      customers: [],
      pets: [],
      appointments: []
    };
    
    this.currentSection = "dashboard";
    this.activeDrawer = null;
    this.selectedAptId = null;
    this.selectedPaymentMethod = "Cash";
    this.revenueChart = null; // Track Chart.js instance

    this.init();
  }

  init() {
    // Load from LocalStorage or initialize with MockData
    const savedData = localStorage.getItem("fashion_pets_data");
    if (savedData) {
      this.state = JSON.parse(savedData);
    } else {
      // Setup initial data
      this.state.services = window.DEFAULT_MOCK_DATA.services;
      this.state.users = window.DEFAULT_MOCK_DATA.users;
      this.state.customers = window.DEFAULT_MOCK_DATA.customers;
      this.state.pets = window.DEFAULT_MOCK_DATA.pets;
      
      // Generate appointments dynamically relative to today
      this.state.appointments = window.generateMockAppointments(
        this.state.customers,
        this.state.pets,
        this.state.services,
        this.state.users
      );
      this.saveState();
    }

    // Set today's date in header
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("current-date-display").textContent = new Date().toLocaleDateString('en-US', options);

    this.registerEventListeners();
    this.render();
  }

  saveState() {
    localStorage.setItem("fashion_pets_data", JSON.stringify(this.state));
  }

  registerEventListeners() {
    // Sidebar Navigation
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-section");
        this.switchSection(target);
      });
    });

    // Customer Sub-tabs
    document.querySelectorAll("#customers-sec .tab-btn").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("#customers-sec .tab-btn").forEach(t => t.classList.remove("active"));
        document.querySelectorAll("#customers-sec .tab-content").forEach(c => c.style.display = "none");
        
        tab.classList.add("active");
        const tabId = tab.getAttribute("data-tab");
        document.getElementById(`tab-${tabId}`).style.display = "block";
        
        // Compile icons inside active tab
        lucide.createIcons();
      });
    });

    // Cancel Button in Customer Tabs
    document.querySelectorAll(".btn-cancel-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        const listTab = document.querySelector('[data-tab="cust-list"]');
        listTab.click();
      });
    });

    // Search Customers directory
    document.getElementById("search-customers-input").addEventListener("keyup", (e) => {
      this.renderCustomerTable(e.target.value.toLowerCase());
    });

    // Open/Close Drawers
    document.getElementById("btn-quick-booking").addEventListener("click", () => this.openDrawer("booking"));
    document.getElementById("btn-close-booking-drawer").addEventListener("click", () => this.closeDrawer());
    document.getElementById("btn-close-apt-drawer").addEventListener("click", () => this.closeDrawer());
    document.getElementById("drawer-backdrop").addEventListener("click", () => this.closeDrawer());

    // Scheduler Form - Auto calculate estimates
    const bookingForm = document.getElementById("form-new-booking");
    bookingForm.addEventListener("change", () => this.calculateBookingEstimates());
    
    // Dynamic Pet selector population based on Customer choice
    document.getElementById("book-cust-select").addEventListener("change", (e) => {
      this.populatePetSelect(e.target.value);
    });

    // Submit New Booking
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewBookingSubmit();
    });

    // Submit New Customer
    document.getElementById("form-new-customer").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewCustomerSubmit();
    });

    // Submit New Pet
    document.getElementById("form-new-pet").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewPetSubmit();
    });

    // Payment method selection
    document.querySelectorAll(".payment-method-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".payment-method-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.selectedPaymentMethod = card.getAttribute("data-method");
      });
    });

    // Submit Checkout
    document.getElementById("btn-submit-payment").addEventListener("click", () => {
      this.handleCheckoutSubmit();
    });
  }

  switchSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));

    const targetSection = document.getElementById(`${sectionId}-sec`);
    const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection && targetLink) {
      targetSection.classList.add("active");
      targetLink.classList.add("active");
      this.currentSection = sectionId;

      // Update Page title
      const titleElement = document.getElementById("page-title");
      if (sectionId === "dashboard") titleElement.textContent = "Operations Dashboard";
      else if (sectionId === "schedule") titleElement.textContent = "Interactive Schedule Board";
      else if (sectionId === "customers") titleElement.textContent = "Customers & Pets Database";
      else if (sectionId === "services") titleElement.textContent = "Services Catalog";
      else if (sectionId === "reports") titleElement.textContent = "Business Reports & Analytics";

      this.render();
    }
  }

  openDrawer(drawerId, id = null) {
    this.closeDrawer();
    
    const backdrop = document.getElementById("drawer-backdrop");
    let drawer;
    
    if (drawerId === "booking") {
      drawer = document.getElementById("booking-drawer");
      this.populateBookingSelects();
      document.getElementById("form-new-booking").reset();
      document.getElementById("booking-estimate-summary").textContent = "Select service & pet to calculate";
      document.getElementById("book-pet-select").disabled = true;
      
      const todayISO = new Date().toISOString().split('T')[0];
      document.getElementById("book-date").value = todayISO;
    } else if (drawerId === "appointment" && id) {
      drawer = document.getElementById("appointment-drawer");
      this.selectedAptId = id;
      this.populateAppointmentDetails(id);
    }

    if (drawer) {
      backdrop.classList.add("active");
      drawer.classList.add("active");
      this.activeDrawer = drawerId;
      lucide.createIcons(); // Compile icons in drawers
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById("drawer-backdrop");
    document.querySelectorAll(".drawer").forEach(d => d.classList.remove("active"));
    backdrop.classList.remove("active");
    this.activeDrawer = null;
    this.selectedAptId = null;
    document.getElementById("drawer-checkout-panel").style.display = "none";
  }

  calculateGroomingMetrics(serviceId, petSize) {
    const service = this.state.services.find(s => s.id === serviceId);
    if (!service) return null;

    let duration = service.baseDurationMinutes;
    let price = service.basePrice;

    if (petSize === "Small") {
      duration += 5;
      price += 5;
    } else if (petSize === "Medium") {
      duration += 10;
      price += 10;
    } else if (petSize === "Large") {
      duration += 15;
      price += 15;
    } else if (petSize === "Giant") {
      duration += 25;
      price += 25;
    }

    return { duration, price };
  }

  populateBookingSelects() {
    const custSelect = document.getElementById("book-cust-select");
    custSelect.innerHTML = `<option value="">-- Choose Customer --</option>`;
    this.state.customers.forEach(c => {
      custSelect.innerHTML += `<option value="${c.id}">${c.fullName} (${c.phone})</option>`;
    });

    const srvSelect = document.getElementById("book-service-select");
    srvSelect.innerHTML = `<option value="">-- Choose Service --</option>`;
    this.state.services.forEach(s => {
      srvSelect.innerHTML += `<option value="${s.id}">${s.name} ($${s.basePrice})</option>`;
    });

    const grSelect = document.getElementById("book-groomer-select");
    grSelect.innerHTML = `<option value="">-- Choose Groomer --</option>`;
    this.state.users.filter(u => u.role === "groomer").forEach(g => {
      grSelect.innerHTML += `<option value="${g.id}">${g.name.split(' ')[0]}</option>`;
    });
  }

  populatePetSelect(customerId) {
    const petSelect = document.getElementById("book-pet-select");
    if (!customerId) {
      petSelect.innerHTML = `<option value="">-- Select Customer First --</option>`;
      petSelect.disabled = true;
      return;
    }

    const customerPets = this.state.pets.filter(p => p.customerId === customerId && p.activeStatus === "active");
    if (customerPets.length === 0) {
      petSelect.innerHTML = `<option value="">No active pets found</option>`;
      petSelect.disabled = true;
      return;
    }

    petSelect.innerHTML = `<option value="">-- Choose Pet --</option>`;
    customerPets.forEach(p => {
      petSelect.innerHTML += `<option value="${p.id}">${p.name} (${p.breed} - ${p.size})</option>`;
    });
    petSelect.disabled = false;
  }

  calculateBookingEstimates() {
    const serviceId = document.getElementById("book-service-select").value;
    const petId = document.getElementById("book-pet-select").value;
    const summaryDiv = document.getElementById("booking-estimate-summary");

    if (!serviceId || !petId) {
      summaryDiv.textContent = "Select service & pet to calculate";
      summaryDiv.style.background = "var(--primary-glow)";
      summaryDiv.style.color = "var(--primary)";
      return;
    }

    const pet = this.state.pets.find(p => p.id === petId);
    if (!pet) return;

    const metrics = this.calculateGroomingMetrics(serviceId, pet.size);
    if (metrics) {
      summaryDiv.innerHTML = `Est: <strong>$${metrics.price}</strong> | <strong>${metrics.duration} mins</strong>`;
      summaryDiv.style.background = "var(--primary-glow)";
      summaryDiv.style.color = "var(--primary)";
    }
  }

  handleNewBookingSubmit() {
    const custId = document.getElementById("book-cust-select").value;
    const petId = document.getElementById("book-pet-select").value;
    const srvId = document.getElementById("book-service-select").value;
    const grId = document.getElementById("book-groomer-select").value;
    const dateVal = document.getElementById("book-date").value;
    const timeVal = document.getElementById("book-time").value;
    const deposit = parseFloat(document.getElementById("book-deposit").value) || 0;
    const notes = document.getElementById("book-notes").value;

    const pet = this.state.pets.find(p => p.id === petId);
    const metrics = this.calculateGroomingMetrics(srvId, pet.size);
    
    const [year, month, date] = dateVal.split('-').map(Number);
    const [hour, min] = timeVal.split(':').map(Number);
    const startAt = new Date(year, month - 1, date, hour, min).toISOString();

    const newApt = {
      id: `apt-${Date.now()}`,
      customerId: custId,
      petId: petId,
      serviceId: srvId,
      assignedUserId: grId,
      startAt: startAt,
      durationMinutes: metrics.duration,
      status: "scheduled",
      depositAmount: deposit,
      notes: notes,
      paymentStatus: "pending",
      paymentAmount: metrics.price,
      paymentMethod: ""
    };

    this.state.appointments.push(newApt);
    this.saveState();
    this.closeDrawer();
    this.render();
  }

  handleNewCustomerSubmit() {
    const fullName = document.getElementById("cust-fullname").value;
    const phone = document.getElementById("cust-phone").value;
    const email = document.getElementById("cust-email").value;
    const notes = document.getElementById("cust-notes").value;

    const newCust = {
      id: `cust-${Date.now()}`,
      fullName,
      phone,
      email,
      notes
    };

    this.state.customers.push(newCust);
    this.saveState();
    
    document.getElementById("form-new-customer").reset();
    document.querySelector('[data-tab="cust-list"]').click();
    this.render();
  }

  handleNewPetSubmit() {
    const customerId = document.getElementById("pet-owner-select").value;
    const name = document.getElementById("pet-name").value;
    const species = document.getElementById("pet-species").value;
    const breed = document.getElementById("pet-breed").value;
    const size = document.getElementById("pet-size").value;
    const age = document.getElementById("pet-age").value;
    const allergies = document.getElementById("pet-allergies").value;
    const behaviorNotes = document.getElementById("pet-behavior").value;

    const newPet = {
      id: `pet-${Date.now()}`,
      customerId,
      name,
      species,
      breed,
      size,
      age,
      allergies,
      behaviorNotes,
      activeStatus: "active"
    };

    this.state.pets.push(newPet);
    this.saveState();

    document.getElementById("form-new-pet").reset();
    document.querySelector('[data-tab="cust-list"]').click();
    this.render();
  }

  populateAppointmentDetails(aptId) {
    const apt = this.state.appointments.find(a => a.id === aptId);
    if (!apt) return;

    const cust = this.state.customers.find(c => c.id === apt.customerId);
    const pet = this.state.pets.find(p => p.id === apt.petId);
    const service = this.state.services.find(s => s.id === apt.serviceId);
    const staff = this.state.users.find(u => u.id === apt.assignedUserId);

    const startTime = new Date(apt.startAt);
    const startStr = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const banner = document.getElementById("drawer-status-banner");
    banner.textContent = apt.status.toUpperCase();
    banner.className = "";
    
    if (apt.status === "scheduled") {
      banner.style.background = "rgba(14, 165, 233, 0.15)";
      banner.style.color = "var(--secondary)";
    } else if (apt.status === "checked-in") {
      banner.style.background = "var(--warning-glow)";
      banner.style.color = "var(--warning)";
    } else if (apt.status === "in-progress") {
      banner.style.background = "rgba(168, 85, 247, 0.15)";
      banner.style.color = "#a855f7";
    } else if (apt.status === "completed") {
      banner.style.background = "var(--success-glow)";
      banner.style.color = "var(--success)";
    } else {
      banner.style.background = "var(--danger-glow)";
      banner.style.color = "var(--danger)";
    }

    document.getElementById("drawer-apt-title").textContent = `Booking: #${apt.id.slice(-4)}`;
    document.getElementById("detail-cust-name").textContent = cust ? `${cust.fullName} (${cust.phone})` : "N/A";
    document.getElementById("detail-pet-name").textContent = pet ? `${pet.name} (${pet.breed} - ${pet.size})` : "N/A";
    document.getElementById("detail-service-name").textContent = service ? service.name : "N/A";
    document.getElementById("detail-groomer-name").textContent = staff ? staff.name : "N/A";
    document.getElementById("detail-time").textContent = `${startTime.toDateString()} at ${startStr}`;
    document.getElementById("detail-duration").textContent = `${apt.durationMinutes} minutes`;
    
    const balance = apt.paymentAmount - apt.depositAmount;
    document.getElementById("detail-price").textContent = `$${apt.paymentAmount}`;
    document.getElementById("detail-deposit").textContent = `$${apt.depositAmount}`;
    document.getElementById("detail-balance").textContent = apt.paymentStatus === "paid" ? "$0 (Paid)" : `$${balance}`;

    const actionContainer = document.getElementById("drawer-actions-container");
    actionContainer.innerHTML = "";

    if (apt.status === "scheduled") {
      actionContainer.innerHTML += `<button class="btn btn-primary" id="btn-action-checkin"><i data-lucide="check"></i> Record Pet Check-in</button>`;
      actionContainer.innerHTML += `<button class="btn btn-danger" id="btn-action-cancel"><i data-lucide="trash-2"></i> Cancel Appointment</button>`;
    } else if (apt.status === "checked-in") {
      actionContainer.innerHTML += `<button class="btn btn-primary" style="background: #a855f7;" id="btn-action-start"><i data-lucide="play"></i> Start Grooming Service</button>`;
    } else if (apt.status === "in-progress") {
      actionContainer.innerHTML += `<button class="btn btn-primary" style="background: var(--success);" id="btn-action-checkout"><i data-lucide="credit-card"></i> Complete & Checkout</button>`;
    } else if (apt.status === "completed" && apt.paymentStatus === "pending") {
      actionContainer.innerHTML += `<button class="btn btn-primary" style="background: var(--success);" id="btn-action-checkout"><i data-lucide="credit-card"></i> Record Payment</button>`;
    }

    // Recompile icons
    lucide.createIcons();

    // Event handlers
    const checkinBtn = document.getElementById("btn-action-checkin");
    if (checkinBtn) checkinBtn.addEventListener("click", () => this.updateAppointmentStatus(aptId, "checked-in"));

    const startBtn = document.getElementById("btn-action-start");
    if (startBtn) startBtn.addEventListener("click", () => this.updateAppointmentStatus(aptId, "in-progress"));

    const cancelBtn = document.getElementById("btn-action-cancel");
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.updateAppointmentStatus(aptId, "cancelled"));

    const checkoutBtn = document.getElementById("btn-action-checkout");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        document.getElementById("drawer-checkout-panel").style.display = "block";
        document.getElementById("checkout-amount").value = balance;
      });
    }
  }

  updateAppointmentStatus(aptId, newStatus) {
    const apt = this.state.appointments.find(a => a.id === aptId);
    if (!apt) return;

    apt.status = newStatus;
    this.saveState();
    this.populateAppointmentDetails(aptId);
    this.render();
  }

  handleCheckoutSubmit() {
    const apt = this.state.appointments.find(a => a.id === this.selectedAptId);
    if (!apt) return;

    apt.status = "completed";
    apt.paymentStatus = "paid";
    apt.paymentMethod = this.selectedPaymentMethod;
    this.saveState();
    this.closeDrawer();
    this.render();
  }

  render() {
    this.renderStats();

    if (this.currentSection === "dashboard") {
      this.renderDashboardTable();
    } else if (this.currentSection === "schedule") {
      this.renderCalendarGrid();
    } else if (this.currentSection === "customers") {
      this.renderCustomerTable();
      this.populateNewPetOwnerSelect();
    } else if (this.currentSection === "services") {
      this.renderServicesCatalog();
    } else if (this.currentSection === "reports") {
      this.renderReports();
    }

    // Compile newly injected Lucide Icons
    lucide.createIcons();
  }

  renderStats() {
    const todayStr = new Date().toDateString();
    const todayApts = this.state.appointments.filter(a => new Date(a.startAt).toDateString() === todayStr && a.status !== "cancelled");

    const totalCount = todayApts.length;
    const checkedInCount = todayApts.filter(a => a.status === "checked-in" || a.status === "in-progress").length;
    const completedCount = todayApts.filter(a => a.status === "completed").length;
    
    const revenue = todayApts
      .filter(a => a.paymentStatus === "paid")
      .reduce((sum, a) => sum + a.paymentAmount, 0);

    document.getElementById("stat-total-apt").textContent = totalCount;
    document.getElementById("stat-checked-in").textContent = checkedInCount;
    document.getElementById("stat-completed").textContent = completedCount;
    document.getElementById("stat-revenue").textContent = `$${revenue}`;
  }

  renderDashboardTable() {
    const tableBody = document.getElementById("dashboard-apt-table-body");
    tableBody.innerHTML = "";

    const todayStr = new Date().toDateString();
    const todayApts = this.state.appointments.filter(a => new Date(a.startAt).toDateString() === todayStr);

    if (todayApts.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No appointments booked for today.</td></tr>`;
      return;
    }

    todayApts.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

    todayApts.forEach(apt => {
      const cust = this.state.customers.find(c => c.id === apt.customerId);
      const pet = this.state.pets.find(p => p.id === apt.petId);
      const service = this.state.services.find(s => s.id === apt.serviceId);
      const groomer = this.state.users.find(u => u.id === apt.assignedUserId);

      const startTime = new Date(apt.startAt);
      const timeStr = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      const balance = apt.paymentAmount - apt.depositAmount;

      tableBody.innerHTML += `
        <tr>
          <td><strong>${timeStr}</strong></td>
          <td>${cust ? cust.fullName : "N/A"}</td>
          <td>🐾 ${pet ? pet.name : "N/A"} (${pet ? pet.breed : "N/A"})</td>
          <td>${service ? service.name : "N/A"}</td>
          <td>${groomer ? groomer.name.split(' ')[0] : "N/A"}</td>
          <td><span class="badge ${this.getStatusBadgeClass(apt.status)}">${apt.status}</span></td>
          <td><span class="badge ${apt.paymentStatus === 'paid' ? 'badge-paid' : 'badge-pending'}">${apt.paymentStatus === 'paid' ? 'Paid' : '$' + balance}</span></td>
          <td>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;" onclick="app.openDrawer('appointment', '${apt.id}')">Manage</button>
          </td>
        </tr>
      `;
    });
  }

  getStatusBadgeClass(status) {
    if (status === "completed") return "badge-paid";
    if (status === "checked-in" || status === "in-progress" || status === "scheduled") return "badge-pending";
    return "badge-pending";
  }

  renderCalendarGrid() {
    const hoursColumn = document.getElementById("calendar-hours-column");
    const staffHeaders = document.getElementById("calendar-staff-headers");
    const gridBackground = document.getElementById("calendar-grid-background");
    const gridColumns = document.getElementById("calendar-grid-columns");
    const appointmentsLayer = document.getElementById("appointments-layer");

    hoursColumn.innerHTML = "";
    staffHeaders.innerHTML = "";
    gridBackground.innerHTML = "";
    gridColumns.innerHTML = "";
    appointmentsLayer.innerHTML = "";

    for (let h = 8; h <= 17; h++) {
      const displayHour = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      hoursColumn.innerHTML += `<div class="hour-cell">${displayHour}:00 ${ampm}</div>`;
      gridBackground.innerHTML += `<div class="grid-row-line"></div>`;
    }

    const groomers = this.state.users.filter(u => u.role === "groomer");
    const colWidth = 100 / groomers.length;

    groomers.forEach(g => {
      staffHeaders.innerHTML += `<div class="staff-header-cell">${g.name.split(' ')[0]}</div>`;
      gridColumns.innerHTML += `<div class="grid-column-divider" style="width: ${colWidth}%"></div>`;
    });

    const todayStr = new Date().toDateString();
    const todayApts = this.state.appointments.filter(a => new Date(a.startAt).toDateString() === todayStr && a.status !== "cancelled");

    todayApts.forEach(apt => {
      const groomerIndex = groomers.findIndex(g => g.id === apt.assignedUserId);
      if (groomerIndex === -1) return;

      const pet = this.state.pets.find(p => p.id === apt.petId);
      const service = this.state.services.find(s => s.id === apt.serviceId);

      const startTime = new Date(apt.startAt);
      const startHours = startTime.getHours();
      const startMinutes = startTime.getMinutes();

      const timeOffsetHours = (startHours + startMinutes / 60) - 8;
      const cardTop = timeOffsetHours * 50;
      const cardHeight = (apt.durationMinutes / 60) * 50;
      
      const cardLeft = groomerIndex * colWidth;
      const cardWidth = colWidth - 0.5;

      const timeStr = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

      const card = document.createElement("div");
      card.className = `appointment-card status-${apt.status}`;
      card.style.top = `${cardTop}px`;
      card.style.height = `${cardHeight}px`;
      card.style.left = `${cardLeft}%`;
      card.style.width = `${cardWidth}%`;
      card.innerHTML = `
        <div class="apt-pet-name">🐾 ${pet ? pet.name : "N/A"} (${pet ? pet.breed.slice(0, 10) : "N/A"})</div>
        <div class="apt-service-name">${service ? service.name : "N/A"}</div>
        <div class="apt-time">${timeStr} (${apt.durationMinutes}m)</div>
      `;

      card.addEventListener("click", () => {
        this.openDrawer("appointment", apt.id);
      });

      appointmentsLayer.appendChild(card);
    });
  }

  renderCustomerTable(filterQuery = "") {
    const tbody = document.getElementById("customers-table-body");
    tbody.innerHTML = "";

    const filtered = this.state.customers.filter(c => {
      const customerMatch = c.fullName.toLowerCase().includes(filterQuery) || c.phone.includes(filterQuery);
      
      const customerPets = this.state.pets.filter(p => p.customerId === c.id);
      const petMatch = customerPets.some(p => p.name.toLowerCase().includes(filterQuery) || p.breed.toLowerCase().includes(filterQuery));

      return customerMatch || petMatch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No matching customers found.</td></tr>`;
      return;
    }

    filtered.forEach(cust => {
      const custPets = this.state.pets.filter(p => p.customerId === cust.id && p.activeStatus === "active");
      
      let petsBadges = custPets.map(p => {
        return `<span style="background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; border: 1px solid var(--panel-border); color: var(--text-main); font-weight: 500;">🐾 ${p.name} (${p.breed} - ${p.size})</span>`;
      }).join(" ");

      if (custPets.length === 0) petsBadges = `<span style="color: var(--text-muted); font-size: 0.8rem;">No pets registered</span>`;

      tbody.innerHTML += `
        <tr>
          <td><strong>${cust.fullName}</strong></td>
          <td>📞 ${cust.phone}<br><span style="font-size: 0.75rem; color: var(--text-muted);">${cust.email || "No email"}</span></td>
          <td><div style="display: flex; flex-wrap: wrap; gap: 6px;">${petsBadges}</div></td>
          <td style="max-width: 250px; font-size: 0.8rem; color: var(--text-muted);">${cust.notes || "None"}</td>
          <td>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;" onclick="app.openBookingWithCustomer('${cust.id}')"><i data-lucide="plus" style="width:12px;height:12px;stroke-width:3px;"></i> Book Groom</button>
          </td>
        </tr>
      `;
    });
  }

  openBookingWithCustomer(customerId) {
    this.openDrawer("booking");
    document.getElementById("book-cust-select").value = customerId;
    this.populatePetSelect(customerId);
  }

  populateNewPetOwnerSelect() {
    const ownerSelect = document.getElementById("pet-owner-select");
    ownerSelect.innerHTML = `<option value="">-- Select Customer --</option>`;
    this.state.customers.forEach(c => {
      ownerSelect.innerHTML += `<option value="${c.id}">${c.fullName} (${c.phone})</option>`;
    });
  }

  renderServicesCatalog() {
    const tbody = document.getElementById("services-table-body");
    tbody.innerHTML = "";

    this.state.services.forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td><strong>${s.name}</strong></td>
          <td style="color: var(--text-muted); font-size: 0.85rem;">${s.description}</td>
          <td>🕒 ${s.baseDurationMinutes} minutes</td>
          <td style="color: var(--primary); font-weight: 700;">$${s.basePrice}</td>
        </tr>
      `;
    });
  }

  renderReports() {
    // 1. Render Chart.js
    this.renderChart();

    // 2. Render Groomer Performance Table
    const grTable = document.getElementById("report-groomers-body");
    grTable.innerHTML = "";

    const groomers = this.state.users.filter(u => u.role === "groomer");
    groomers.forEach(g => {
      const completedJobs = this.state.appointments.filter(a => a.assignedUserId === g.id && a.status === "completed").length;
      grTable.innerHTML += `
        <tr>
          <td><strong>${g.name.split(' ')[0]}</strong></td>
          <td>${completedJobs} jobs completed</td>
        </tr>
      `;
    });
  }

  renderChart() {
    const ctxElement = document.getElementById('revenueChart');
    if (!ctxElement) return;

    // Destroy old instance to avoid hover memory leaks
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }

    const cardApts = this.state.appointments.filter(a => a.paymentStatus === "paid" && a.paymentMethod === "Card");
    const cashApts = this.state.appointments.filter(a => a.paymentStatus === "paid" && a.paymentMethod === "Cash");
    const transApts = this.state.appointments.filter(a => a.paymentStatus === "paid" && a.paymentMethod === "Transfer");

    const cashSum = cashApts.reduce((s, a) => s + a.paymentAmount, 0);
    const cardSum = cardApts.reduce((s, a) => s + a.paymentAmount, 0);
    const transSum = transApts.reduce((s, a) => s + a.paymentAmount, 0);

    const ctx = ctxElement.getContext('2d');
    this.revenueChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['💵 Cash', '💳 Card', '🏦 Transfer'],
        datasets: [{
          data: [cashSum, cardSum, transSum],
          backgroundColor: ['#0d9488', '#0ea5e9', '#6366f1'],
          borderWidth: 4,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#64748b',
              boxWidth: 15,
              padding: 15,
              font: {
                family: 'Inter',
                size: 12,
                weight: '500'
              }
            }
          }
        },
        cutout: '65%'
      }
    });
  }
}

// Global instance load
window.addEventListener("DOMContentLoaded", () => {
  window.app = new MockupApp();
});
