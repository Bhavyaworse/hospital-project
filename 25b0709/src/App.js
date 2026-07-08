import React, { useState, useEffect } from 'react';

function App() {
  // Navigation & Base States
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencyAlert, setEmergencyAlert] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  // FAQ Accordion State (Clickable Dropdowns)
  const [openFaq, setOpenFaq] = useState(null);

  // Search, Filter & Live Billing States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [billingRoom, setBillingRoom] = useState('General Ward');
  const [billingInsurance, setBillingInsurance] = useState('None');
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  // EMR Timeline Clickable Filter State
  const [timelineFilter, setTimelineFilter] = useState('All');

  // Form Booking States
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Local Seed Data
  useEffect(() => {
    setDoctors([
      { id: 1, name: "Dr. Alisha Sharma", specialty: "Cardiology", sub: "Interventional Cardiologist", fee: 800, room: "Tower Alpha - Room 301", rating: "4.9 ★", slots: ["09:00 AM", "10:30 AM", "02:00 PM"] },
      { id: 2, name: "Dr. Rohan Verma", specialty: "Pediatrics", sub: "Neonatal Care Expert", fee: 600, room: "Pediatric Wing - Room 104", rating: "4.8 ★", slots: ["11:00 AM", "01:00 PM", "04:30 PM"] },
      { id: 3, name: "Dr. Sarah D'Souza", specialty: "Neurology", sub: "Neuro-cognitive Chief", fee: 1200, room: "Specialty Block - Suite 2", rating: "5.0 ★", slots: ["10:00 AM", "03:00 PM", "06:00 PM"] },
      { id: 4, name: "Dr. Amit Malhotra", specialty: "Orthopedics", sub: "Joint Replacement Surgeon", fee: 750, room: "Trauma Care - Room 12", rating: "4.7 ★", slots: ["08:30 AM", "12:00 PM", "05:30 PM"] }
    ]);
    
    setAppointments([
      { id: 7521, patient_name: "Harsh Vardhan", doctor_name: "Dr. Alisha Sharma", time_slot: "10:30 AM", status: "In Consultation", priority: "High" }
    ]);
  }, []);

  // Live Real-Time Billing Calculator Logics
  useEffect(() => {
    let base = selectedDoctor ? selectedDoctor.fee : 500;
    let roomCharge = billingRoom === 'Executive Suite' ? 5000 : billingRoom === 'Semi-Private' ? 2500 : 800;
    let subtotal = base + roomCharge;
    
    if (billingInsurance === 'Student Health Scheme') subtotal = subtotal * 0.2; 
    if (billingInsurance === 'Corporate Insurance') subtotal = subtotal * 0.5; 
    
    setCalculatedTotal(Math.round(subtotal));
  }, [selectedDoctor, billingRoom, billingInsurance]);

  const commitBooking = (e) => {
    e.preventDefault();
    const newQueueNode = {
      id: Math.floor(Math.random() * 90000) + 10000,
      patient_name: patientName,
      doctor_name: selectedDoctor.name,
      time_slot: selectedSlot,
      status: "Awaiting Vitals",
      priority: symptoms.toLowerCase().includes('severe') || symptoms.length > 35 ? "High" : "Routine"
    };

    setAppointments([newQueueNode, ...appointments]);
    setSuccessToast(`✔ Encryption Confirmed: Live secure token generated for ${patientName}.`);
    
    setPatientName('');
    setSymptoms('');
    setSelectedSlot('');
    setTimeout(() => {
      setActiveTab('pipelines');
      setSuccessToast('');
    }, 1500);
  };

  const filteredDoctors = doctors.filter(doc => {
    const queryMatch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const deptMatch = selectedDeptFilter === 'All' || doc.specialty === selectedDeptFilter;
    return queryMatch && deptMatch;
  });

  // Sample Static Timeline Events Array for Filtering
  const timelineEvents = [
    { type: 'Vaccination', date: 'March 14, 2026', title: 'Routine Immunization Sequence', desc: 'Completed at IITB Central Wellness Ward.' },
    { type: 'Diagnostic', date: 'January 22, 2026', title: 'Ophthalmology Checkup', desc: 'Dr. S. Nair issued lens parameters (L: -1.50, R: -1.25).' },
    { type: 'Vaccination', date: 'November 05, 2025', title: 'Influenza Annual Dose', desc: 'Campus drive batch coverage confirmed.' }
  ];

  const filteredTimeline = timelineEvents.filter(ev => timelineFilter === 'All' || ev.type === timelineFilter);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b', display: 'flex', flexDirection: 'column' }}>
      
      {/* Clickable Emergency Banner */}
      {emergencyAlert && (
        <div style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '12px 40px', fontSize: '13px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <span>🚨 <strong>System Notice:</strong> Trauma Unit Wing B is undergoing router maintenance. All allocations redirected to Wing A Stand 901-906.</span>
          <button onClick={() => setEmergencyAlert(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '18px', fontWeight: '600' }}>×</button>
        </div>
      )}

      {/* Main Top Header Branding */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '26px' }}>🩺</span>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>PulseLine <span style={{ color: '#2563eb' }}>Nexus Pro</span></h1>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Clinical Information Terminal System</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>Verified Academic Node</div>
          <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>ID: 25b0709</div>
        </div>
      </header>

      {/* Primary Workspace Layout */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Left Side Navigation Terminal */}
        <aside style={{ width: '260px', padding: '40px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', paddingLeft: '12px', marginBottom: '8px', letterSpacing: '0.05em' }}>Navigation Console</span>
          
          <button onClick={() => setActiveTab('overview')} style={{ textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeTab === 'overview' ? '#ffffff' : 'transparent', color: activeTab === 'overview' ? '#2563eb' : '#475569', boxShadow: activeTab === 'overview' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>📊 System Overview</button>
          <button onClick={() => setActiveTab('registries')} style={{ textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeTab === 'registries' ? '#ffffff' : 'transparent', color: activeTab === 'registries' ? '#2563eb' : '#475569', boxShadow: activeTab === 'registries' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>🗂 Medical Registries</button>
          <button onClick={() => setActiveTab('intake')} style={{ textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeTab === 'intake' ? '#ffffff' : 'transparent', color: activeTab === 'intake' ? '#2563eb' : '#475569', boxShadow: activeTab === 'intake' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>🔌 Intake Console</button>
          <button onClick={() => setActiveTab('billing')} style={{ textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeTab === 'billing' ? '#ffffff' : 'transparent', color: activeTab === 'billing' ? '#2563eb' : '#475569', boxShadow: activeTab === 'billing' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>💳 In-Patient Billing</button>
          <button onClick={() => setActiveTab('records')} style={{ textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeTab === 'records' ? '#ffffff' : 'transparent', color: activeTab === 'records' ? '#2563eb' : '#475569', boxShadow: activeTab === 'records' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>⏳ Historical EMR Log</button>
          <button onClick={() => setActiveTab('pipelines')} style={{ textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeTab === 'pipelines' ? '#ffffff' : 'transparent', color: activeTab === 'pipelines' ? '#2563eb' : '#475569', boxShadow: activeTab === 'pipelines' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>⚙ Live Streams ({appointments.length})</button>
        </aside>

        {/* Right Dynamic Central Core */}
        <main style={{ flex: 1, padding: '40px 0', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* TAB 1: OVERVIEW (WITH CLICKABLE FAQ ACCORDIONS) */}
            {activeTab === 'overview' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <h3 style={{ marginTop: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Decoupled Micro-System Dashboard</h3>
                <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: '1.6', margin: '12px 0 24px 0' }}>
                  PulseLine handles automated patient distribution parameters across active streams. Feel free to interact with any module tab or click panel dropdown components below to trigger live data responses.
                </p>
                
                {/* Clickable Accordion UI */}
                <h4 style={{ marginTop: '28px', marginBottom: '12px', fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>📋 Click to Expand Hospital Protocols</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                    <div onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} style={{ padding: '14px 16px', backgroundColor: '#f8fafc', fontSize: '13.5px', fontWeight: '600', color: '#334155', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Q1: What are the primary hours for OPD Stand 901-906?</span>
                      <span>{openFaq === 1 ? '▲' : '▼'}</span>
                    </div>
                    {openFaq === 1 && (
                      <div style={{ padding: '14px 16px', borderTop: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', lineHeight: '1.5', backgroundColor: '#ffffff' }}>
                        General OPD consultation lines operate between 08:00 AM to 06:00 PM. Emergency triage pipelines remain active 24/7.
                      </div>
                    )}
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                    <div onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} style={{ padding: '14px 16px', backgroundColor: '#f8fafc', fontSize: '13.5px', fontWeight: '600', color: '#334155', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Q2: How does the dynamic token generation script track placement?</span>
                      <span>{openFaq === 2 ? '▲' : '▼'}</span>
                    </div>
                    {openFaq === 2 && (
                      <div style={{ padding: '14px 16px', borderTop: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', lineHeight: '1.5', backgroundColor: '#ffffff' }}>
                        The local transaction script registers form actions directly into an in-memory execution array, routing the generated tracking node sequence straight to the Live Streams terminal.
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: MEDICAL REGISTRIES (CLICK INTERACTION) */}
            {activeTab === 'registries' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Verified Clinician Registries</h3>
                    <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Click <strong>Map Token</strong> to interactively push profiles directly into the setup console.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select value={selectedDeptFilter} onChange={(e) => setSelectedDeptFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff', fontWeight: '500' }}>
                      <option value="All">All Specialties</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredDoctors.map(doc => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: selectedDoctor?.id === doc.id ? '1px solid #2563eb' : '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: selectedDoctor?.id === doc.id ? '#f0f9ff' : '#f8fafc' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', color: '#0f172a', fontWeight: '600' }}>{doc.name}</h4>
                          <span style={{ fontSize: '11px', backgroundColor: '#fef08a', color: '#854d0e', padding: '1px 5px', borderRadius: '4px', fontWeight: '600' }}>{doc.rating}</span>
                        </div>
                        <p style={{ margin: '2px 0 4px 0', fontSize: '13px', color: '#475569' }}>{doc.specialty} · <span style={{ color: '#64748b' }}>{doc.sub}</span></p>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>📍 {doc.room}</span>
                      </div>
                      <button onClick={() => { setSelectedDoctor(doc); setSelectedSlot(''); setActiveTab('intake'); }} style={{ backgroundColor: selectedDoctor?.id === doc.id ? '#2563eb' : '#ffffff', color: selectedDoctor?.id === doc.id ? '#ffffff' : '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                        {selectedDoctor?.id === doc.id ? 'Selected ✓' : 'Map Token'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CLINICAL INTAKE CONSOLE */}
            {activeTab === 'intake' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Triage Processing Pipeline</h3>
                {!selectedDoctor ? (
                  <div style={{ border: '2px dashed #cbd5e1', padding: '40px', borderRadius: '8px', textAlign: 'center', color: '#64748b', marginTop: '16px', fontSize: '13.5px' }}>
                    ⚠️ Process Halted. Click an official target inside the <strong>Medical Registries</strong> panel to open this form interface.
                  </div>
                ) : (
                  <form onSubmit={commitBooking} style={{ marginTop: '16px' }}>
                    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', fontSize: '13.5px', color: '#1e40af', fontWeight: '500' }}>
                      🎯 Active Field Mapping: {selectedDoctor.name} ({selectedDoctor.specialty})
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>Patient Legal Identity Name</label>
                      <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} required placeholder="Input comprehensive identification sequence" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13.5px' }} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>Click to Choose Live Availability Token Slot</label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {selectedDoctor.slots.map(s => (
                          <button type="button" key={s} onClick={() => setSelectedSlot(s)} style={{ padding: '8px 14px', borderRadius: '20px', border: '1px solid #2563eb', backgroundColor: selectedSlot === s ? '#2563eb' : '#ffffff', color: selectedSlot === s ? '#ffffff' : '#2563eb', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>Triage Symptoms Description</label>
                      <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} required placeholder="Log somatic indicators directly..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', height: '70px', boxSizing: 'border-box', resize: 'none', fontSize: '13.5px' }} />
                    </div>
                    <button type="submit" disabled={!selectedSlot} style={{ backgroundColor: selectedSlot ? '#10b981' : '#cbd5e1', color: '#ffffff', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: selectedSlot ? 'pointer' : 'not-allowed', width: '100%', fontSize: '14px' }}>Commit Encrypted Queue Ticket</button>
                  </form>
                )}
                {successToast && <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontWeight: '600', fontSize: '13.5px' }}>{successToast}</div>}
              </div>
            )}

            {/* TAB 4: BILLING (FULLY INTERACTIVE DROPDOWNS) */}
            {activeTab === 'billing' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <h3 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Interactive Institutional Billing Estimator</h3>
                <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '20px' }}>Change dropdown options below to watch values recalibrate dynamically via state execution loops.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>Accommodation Plan</label>
                    <select value={billingRoom} onChange={(e) => setBillingRoom(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '13.5px', cursor: 'pointer' }}>
                      <option value="General Ward">General Ward (₹800 / day)</option>
                      <option value="Semi-Private">Semi-Private (₹2500 / day)</option>
                      <option value="Executive Suite">Executive Suite (₹5000 / day)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>Coverage Bracket</label>
                    <select value={billingInsurance} onChange={(e) => setBillingInsurance(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '13.5px', cursor: 'pointer' }}>
                      <option value="None">Self-Pay (0% Offset)</option>
                      <option value="Corporate Insurance">Corporate Plan (50% Offset)</option>
                      <option value="Student Health Scheme">Student Scheme (80% Offset)</option>
                    </select>
                  </div>
                </div>

                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Clinician Reference Rate:</span>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginTop: '2px' }}>{selectedDoctor ? `${selectedDoctor.name} (₹${selectedDoctor.fee})` : "No Operator Selected (Base Fee: ₹500)"}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Live Dynamic Total</span>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981', marginTop: '2px' }}>₹{calculatedTotal}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: HISTORICAL EMR (WITH CLICKABLE TIMELINE CHIPS) */}
            {activeTab === 'records' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Electronic Health Records History Timeline</h3>
                    <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Click filter nodes below to dynamically filter logs matrix.</p>
                  </div>
                </div>

                {/* Clickable Filters for Timeline */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {['All', 'Vaccination', 'Diagnostic'].map(type => (
                    <button key={type} onClick={() => setTimelineFilter(type)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', cursor: 'pointer', backgroundColor: timelineFilter === type ? '#0f172a' : '#ffffff', color: timelineFilter === type ? '#ffffff' : '#475569' }}>
                      {type === 'All' ? 'All Records' : type}
                    </button>
                  ))}
                </div>

                <div style={{ borderLeft: '2px solid #cbd5e1', paddingLeft: '20px', marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {filteredTimeline.map((ev, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', width: '9px', height: '9px', backgroundColor: '#2563eb', borderRadius: '50%', left: '-26px', top: '5px' }}></div>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{ev.date} · <span style={{ color: '#2563eb' }}>{ev.type}</span></span>
                      <h4 style={{ margin: '2px 0', fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>{ev.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>{ev.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: LIVE OPERATIONAL STREAMS */}
            {activeTab === 'pipelines' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Active Event Loop Pipeline</h3>
                <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '20px' }}>Real-time verification registry displaying pipeline submission tracks.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {appointments.map(app => (
                    <div key={app.id} style={{ padding: '14px 18px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fcfcfc' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '15px', color: '#0f172a', fontWeight: '600' }}>{app.patient_name}</strong>
                          <span style={{ fontSize: '11px', backgroundColor: app.priority === 'High' ? '#fee2e2' : '#f1f5f9', color: app.priority === 'High' ? '#991b1b' : '#475569', padding: '1px 5px', borderRadius: '4px', fontWeight: '600' }}>{app.priority} Priority</span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#475569' }}>Operator Node: <strong>{app.doctor_name}</strong> · Allocated Matrix: <span style={{ color: '#2563eb', fontWeight: '500' }}>{app.time_slot}</span></p>
                      </div>
                      <span style={{ fontSize: '12px', backgroundColor: app.status === 'In Consultation' ? '#fef3c7' : app.status === 'Awaiting Vitals' ? '#e0f2fe' : '#dcfce7', color: app.status === 'In Consultation' ? '#d97706' : app.status === 'Awaiting Vitals' ? '#0369a1' : '#166534', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>{app.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Static Sidebar Guide Panel */}
          <aside>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'sticky', top: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <h3 style={{ marginTop: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>📊 Interactive Metrics Guide</h3>
              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.6', margin: '10px 0' }}>
                This decentralized framework renders highly interactive state triggers to simulate a real clinical terminal software.
              </p>
              <h4 style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', margin: '16px 0 6px 0', letterSpacing: '0.05em' }}>Click Actions Verified</h4>
              <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '12.5px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.4' }}>
                <li><strong>FAQ Toggles:</strong> Click items inside the overview panel to verify dynamic conditional layout shifts.</li>
                <li><strong>Interactive Estimator:</strong> Dropdown configuration arrays immediately trigger live mathematical state recalculations.</li>
                <li><strong>EMR Log Filter:</strong> Active array manipulation pipelines partition datasets based on button clicks seamlessly.</li>
              </ul>
            </div>
          </aside>

        </main>
      </div>
    </div>
  );
}

export default App;
