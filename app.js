/* ── CURA CLINICAL DASHBOARD ── */

// ── DATA ────────────────────────────────────────────────

const PATIENTS = [
  { id: 1, name: "Amara Osei",      initials: "AO", age: 34, condition: "Anxiety & Depression",  lastVisit: "Sep 15, 2026", status: "active",   mood: 6, color: "#3B82C4" },
  { id: 2, name: "James Whitfield", initials: "JW", age: 28, condition: "PTSD",                  lastVisit: "Sep 17, 2026", status: "stable",   mood: 7, color: "#2A9D8F" },
  { id: 3, name: "Sofia Reyes",     initials: "SR", age: 45, condition: "Bipolar II",             lastVisit: "Sep 10, 2026", status: "active",   mood: 5, color: "#9B59B6" },
  { id: 4, name: "Daniel Okafor",   initials: "DO", age: 31, condition: "Generalised Anxiety",   lastVisit: "Sep 18, 2026", status: "stable",   mood: 8, color: "#E8A838" },
  { id: 5, name: "Priya Nair",      initials: "PN", age: 52, condition: "Major Depression",       lastVisit: "Sep 12, 2026", status: "critical", mood: 3, color: "#E05C5C" },
  { id: 6, name: "Luca Ferretti",   initials: "LF", age: 23, condition: "Social Anxiety",        lastVisit: "Sep 14, 2026", status: "stable",   mood: 7, color: "#3B82C4" },
  { id: 7, name: "Aisha Balogun",   initials: "AB", age: 38, condition: "OCD",                   lastVisit: "Sep 16, 2026", status: "active",   mood: 6, color: "#2A9D8F" },
  { id: 8, name: "Marcus Chen",     initials: "MC", age: 41, condition: "PTSD & Anxiety",        lastVisit: "Sep 11, 2026", status: "active",   mood: 5, color: "#9B59B6" },
];

const APPOINTMENTS = [
  { id: 1, patient: "Amara Osei",      initials: "AO", color: "#3B82C4", type: "Follow-up",            time: "9:00 AM",  date: "2026-09-19", day: "Today",    duration: "45 min" },
  { id: 2, patient: "Daniel Okafor",   initials: "DO", color: "#E8A838", type: "Initial Consultation",  time: "10:30 AM", date: "2026-09-19", day: "Today",    duration: "60 min" },
  { id: 3, patient: "Luca Ferretti",   initials: "LF", color: "#3B82C4", type: "Therapy Session",       time: "2:00 PM",  date: "2026-09-19", day: "Today",    duration: "50 min" },
  { id: 4, patient: "James Whitfield", initials: "JW", color: "#2A9D8F", type: "Follow-up",            time: "9:30 AM",  date: "2026-09-20", day: "Tomorrow", duration: "45 min" },
  { id: 5, patient: "Aisha Balogun",   initials: "AB", color: "#2A9D8F", type: "Therapy Session",       time: "11:00 AM", date: "2026-09-20", day: "Tomorrow", duration: "50 min" },
  { id: 6, patient: "Priya Nair",      initials: "PN", color: "#E05C5C", type: "Crisis Check-in",       time: "3:30 PM",  date: "2026-09-20", day: "Tomorrow", duration: "30 min" },
  { id: 7, patient: "Sofia Reyes",     initials: "SR", color: "#9B59B6", type: "Medication Review",     time: "10:00 AM", date: "2026-09-22", day: "Mon",      duration: "30 min" },
  { id: 8, patient: "Marcus Chen",     initials: "MC", color: "#9B59B6", type: "Therapy Session",       time: "1:00 PM",  date: "2026-09-22", day: "Mon",      duration: "50 min" },
];

const ACTIVITY = [
  { text: "<strong>Priya Nair</strong> submitted a mood check-in — score: 3/10", time: "8 min ago",  color: "#E05C5C" },
  { text: "<strong>Daniel Okafor</strong> confirmed tomorrow's appointment",       time: "22 min ago", color: "#E8A838" },
  { text: "Session notes updated for <strong>Aisha Balogun</strong>",             time: "1 hr ago",   color: "#2A9D8F" },
  { text: "<strong>James Whitfield</strong> completed weekly mood journal",        time: "2 hrs ago",  color: "#3B82C4" },
  { text: "New referral received for <strong>Marcus Chen</strong>",               time: "Yesterday",  color: "#9B59B6" },
];

const MOOD_HISTORY = {
  "Amara Osei":      [5, 6, 5, 7, 6, 7, 6],
  "Priya Nair":      [3, 2, 4, 3, 3, 4, 3],
  "Daniel Okafor":   [7, 8, 7, 8, 8, 9, 8],
  "James Whitfield": [6, 6, 7, 7, 6, 8, 7],
  "Sofia Reyes":     [4, 5, 4, 5, 5, 6, 5],
  "Luca Ferretti":   [7, 7, 8, 7, 8, 7, 7],
  "Aisha Balogun":   [6, 5, 6, 7, 6, 6, 6],
  "Marcus Chen":     [5, 4, 5, 5, 6, 5, 5],
};

const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const APPT_PER_DAY = [3, 4, 2, 5, 3, 1, 0];

// ── NAVIGATION ──────────────────────────────────────────

const TITLES = {
  dashboard:    "Dashboard",
  appointments: "Appointments",
  patients:     "Patients",
  mood:         "Mood Tracker",
  reports:      "Reports",
};

let moodChartInst = null;
let apptChartInst = null;
let diagChartInst = null;

function initNav() {
  document.querySelectorAll(".nav-btn, .panel-link").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (!target) return;
      switchPage(target);
    });
  });
}

function switchPage(target) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(target).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.target === target);
  });

  document.getElementById("page-title").textContent = TITLES[target] || "";

  // Close mobile sidebar
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("open");

  // Init charts on first view
  if (target === "mood") initMoodChart("all");
  if (target === "reports") initReportCharts();
}

// ── MOBILE SIDEBAR ──────────────────────────────────────

function initMobileSidebar() {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  });
}

// ── DARK MODE ───────────────────────────────────────────

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  const sunSVG = `<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="5"/>`;
  const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

  const saved = localStorage.getItem("cura-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  icon.innerHTML = saved === "dark" ? sunSVG : moonSVG;

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("cura-theme", next);
    icon.innerHTML = next === "dark" ? sunSVG : moonSVG;

    // Re-render charts with new theme colors
    if (moodChartInst) { moodChartInst.destroy(); moodChartInst = null; initMoodChart(document.getElementById("mood-patient").value); }
    if (apptChartInst) { apptChartInst.destroy(); apptChartInst = null; }
    if (diagChartInst) { diagChartInst.destroy(); diagChartInst = null; }
    if (!document.getElementById("reports").classList.contains("hidden")) initReportCharts();
  });
}

// ── DATE & GREETING ─────────────────────────────────────

function initDashboardHeader() {
  const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  document.getElementById("dash-date").textContent =
    new Date().toLocaleDateString("en-GB", opts);
}

// ── TODAY'S APPOINTMENTS ─────────────────────────────────

function renderTodayAppts() {
  const today = APPOINTMENTS.filter(a => a.day === "Today");
  const wrap = document.getElementById("today-appts");

  if (today.length === 0) {
    wrap.innerHTML = `<p class="empty-msg">No appointments today.</p>`;
    return;
  }

  wrap.innerHTML = today.map(a => `
    <div class="appt-item">
      <span class="appt-time">${a.time}</span>
      <div class="appt-av" style="background:${a.color}">${a.initials}</div>
      <div class="appt-info">
        <div class="appt-name">${a.patient}</div>
        <div class="appt-type">${a.type} &middot; ${a.duration}</div>
      </div>
      <span class="appt-tag appt-tag--today">Today</span>
    </div>
  `).join("");
}

// ── RECENT ACTIVITY ──────────────────────────────────────

function renderActivity() {
  const wrap = document.getElementById("recent-activity");
  wrap.innerHTML = ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div>
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join("");
}

// ── APPOINTMENTS SECTION ─────────────────────────────────

let calYear = 2026, calMonth = 8; // 0-indexed: 8 = September

const APPT_DATES = APPOINTMENTS.map(a => a.date);

function renderCalendar() {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  document.getElementById("cal-title").textContent = `${months[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();

  let html = `<div class="cal-weekdays">`;
  ["Su","Mo","Tu","We","Th","Fr","Sa"].forEach(d => {
    html += `<div class="cal-weekday">${d}</div>`;
  });
  html += `</div><div class="cal-days">`;

  // Blank cells
  const prevDays = new Date(calYear, calMonth, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${prevDays - i}</div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const isToday = today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === d;
    const hasAppt = APPT_DATES.includes(dateStr);
    html += `<div class="cal-day${isToday ? " today" : ""}${hasAppt ? " has-appt" : ""}">${d}</div>`;
  }

  html += `</div>`;
  document.getElementById("calendar").innerHTML = html;
}

function renderApptList() {
  const wrap = document.getElementById("appt-list");
  wrap.innerHTML = APPOINTMENTS.map(a => {
    const tagClass = a.day === "Today" ? "today" : a.day === "Tomorrow" ? "tomorrow" : "later";
    return `
      <div class="appt-item">
        <span class="appt-time">${a.time}</span>
        <div class="appt-av" style="background:${a.color}">${a.initials}</div>
        <div class="appt-info">
          <div class="appt-name">${a.patient}</div>
          <div class="appt-type">${a.type} &middot; ${a.duration}</div>
        </div>
        <span class="appt-tag appt-tag--${tagClass}">${a.day}</span>
      </div>
    `;
  }).join("");
}

function initCalendarNav() {
  document.getElementById("cal-prev").addEventListener("click", () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });
  document.getElementById("cal-next").addEventListener("click", () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });
}

// ── PATIENTS ─────────────────────────────────────────────

function renderPatients(filter = "all", search = "") {
  const grid = document.getElementById("patients-grid");
  let list = PATIENTS;

  if (filter !== "all") list = list.filter(p => p.status === filter);
  if (search) list = list.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-msg" style="grid-column:1/-1">No patients found.</p>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const moodColor = p.mood >= 7 ? "#2A9D8F" : p.mood >= 5 ? "#E8A838" : "#E05C5C";
    return `
      <div class="patient-card">
        <div class="patient-card-top">
          <div class="patient-av" style="background:${p.color}">${p.initials}</div>
          <div>
            <div class="patient-name">${p.name}</div>
            <div class="patient-age">Age ${p.age}</div>
          </div>
          <span class="status-badge status-badge--${p.status}">${p.status}</span>
        </div>
        <div class="patient-condition">${p.condition}</div>
        <div class="patient-meta">
          <span>Last visit: ${p.lastVisit}</span>
          <span class="mood-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${moodColor}" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span class="mood-score" style="color:${moodColor}">${p.mood}/10</span>
          </span>
        </div>
      </div>
    `;
  }).join("");
}

function initPatientControls() {
  let currentFilter = "all";
  let currentSearch = "";

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderPatients(currentFilter, currentSearch);
    });
  });

  document.getElementById("patient-search").addEventListener("input", e => {
    currentSearch = e.target.value;
    renderPatients(currentFilter, currentSearch);
  });

  // Global search in topbar
  document.getElementById("search-input").addEventListener("input", e => {
    if (e.target.value.trim()) {
      switchPage("patients");
      document.getElementById("patient-search").value = e.target.value;
      renderPatients("all", e.target.value);
    }
  });
}

// ── MOOD CHART ───────────────────────────────────────────

function getChartColors() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    grid: dark ? "#2D3F55" : "#E2E8F0",
    text: dark ? "#94A3B8" : "#64748B",
  };
}

function initMoodChart(patientName) {
  const ctx = document.getElementById("moodChart").getContext("2d");
  const colors = getChartColors();

  let datasets = [];
  const legend = document.getElementById("mood-legend");
  legend.innerHTML = "";

  if (patientName === "all") {
    // Average across all patients
    const avg = WEEK_LABELS.map((_, i) =>
      Math.round(Object.values(MOOD_HISTORY).reduce((s, d) => s + d[i], 0) / PATIENTS.length * 10) / 10
    );
    datasets = [{ label: "Average Mood", data: avg, borderColor: "#3B82C4", backgroundColor: "#3B82C420", tension: 0.4, fill: true, pointRadius: 4 }];
    legend.innerHTML = `<span class="legend-item"><span class="legend-dot" style="background:#3B82C4"></span>Average</span>`;
  } else {
    const p = PATIENTS.find(p => p.name === patientName);
    if (p && MOOD_HISTORY[p.name]) {
      datasets = [{ label: p.name, data: MOOD_HISTORY[p.name], borderColor: p.color, backgroundColor: p.color + "20", tension: 0.4, fill: true, pointRadius: 4 }];
      legend.innerHTML = `<span class="legend-item"><span class="legend-dot" style="background:${p.color}"></span>${p.name}</span>`;
    }
  }

  if (moodChartInst) moodChartInst.destroy();

  moodChartInst = new Chart(ctx, {
    type: "line",
    data: { labels: WEEK_LABELS, datasets },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0, max: 10,
          ticks: { color: colors.text, stepSize: 2 },
          grid: { color: colors.grid },
        },
        x: {
          ticks: { color: colors.text },
          grid: { color: colors.grid },
        }
      }
    }
  });
}

function renderMoodSummary() {
  const wrap = document.getElementById("mood-summary");
  wrap.innerHTML = PATIENTS.map(p => {
    const scores = MOOD_HISTORY[p.name] || [];
    const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "N/A";
    const color = avg >= 7 ? "#2A9D8F" : avg >= 5 ? "#E8A838" : "#E05C5C";
    const label = avg >= 7 ? "Good" : avg >= 5 ? "Moderate" : "Low";
    return `
      <div class="mood-card">
        <div class="mood-card-name">${p.name}</div>
        <div class="mood-card-score" style="color:${color}">${avg}</div>
        <div class="mood-card-label">${label} &middot; 7-day avg</div>
      </div>
    `;
  }).join("");
}

function initMoodControls() {
  const sel = document.getElementById("mood-patient");
  PATIENTS.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name;
    sel.appendChild(opt);
  });

  sel.addEventListener("change", () => {
    if (moodChartInst) moodChartInst.destroy();
    moodChartInst = null;
    initMoodChart(sel.value);
  });

  renderMoodSummary();
}

// ── REPORT CHARTS ────────────────────────────────────────

function initReportCharts() {
  const colors = getChartColors();

  // Bar chart — appointments per day
  if (!apptChartInst) {
    const ctx1 = document.getElementById("apptChart").getContext("2d");
    apptChartInst = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: WEEK_LABELS,
        datasets: [{
          label: "Appointments",
          data: APPT_PER_DAY,
          backgroundColor: "#3B82C4",
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: colors.text, stepSize: 1 },
            grid: { color: colors.grid },
          },
          x: {
            ticks: { color: colors.text },
            grid: { color: "transparent" },
          }
        }
      }
    });
  }

  // Doughnut chart — diagnosis breakdown
  if (!diagChartInst) {
    const ctx2 = document.getElementById("diagChart").getContext("2d");
    diagChartInst = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Anxiety", "Depression", "PTSD", "Bipolar", "OCD"],
        datasets: [{
          data: [3, 2, 2, 1, 1],
          backgroundColor: ["#3B82C4", "#E05C5C", "#2A9D8F", "#9B59B6", "#E8A838"],
          borderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: colors.text, padding: 16, font: { size: 12 } }
          }
        },
        cutout: "65%",
      }
    });
  }

  // Report stat cards
  document.getElementById("report-stats").innerHTML = `
    <div class="report-stat">
      <div class="report-stat-label">Total Sessions (Sep)</div>
      <div class="report-stat-val">18</div>
      <div class="report-stat-sub">+3 from August</div>
    </div>
    <div class="report-stat">
      <div class="report-stat-label">Avg Session Length</div>
      <div class="report-stat-val">47<span style="font-size:1rem;color:var(--text-faint)"> min</span></div>
      <div class="report-stat-sub">Across all patients</div>
    </div>
    <div class="report-stat">
      <div class="report-stat-label">Cancellation Rate</div>
      <div class="report-stat-val">8<span style="font-size:1rem;color:var(--text-faint)">%</span></div>
      <div class="report-stat-sub">Down from 12% last month</div>
    </div>
    <div class="report-stat">
      <div class="report-stat-label">Patient Retention</div>
      <div class="report-stat-val">94<span style="font-size:1rem;color:var(--text-faint)">%</span></div>
      <div class="report-stat-sub">12-month average</div>
    </div>
  `;
}

// ── INIT ─────────────────────────────────────────────────

function init() {
  initNav();
  initMobileSidebar();
  initThemeToggle();
  initDashboardHeader();
  renderTodayAppts();
  renderActivity();
  renderCalendar();
  renderApptList();
  initCalendarNav();
  renderPatients();
  initPatientControls();
  initMoodControls();
}

document.addEventListener("DOMContentLoaded", init);