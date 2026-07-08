import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDoctors([
      { id: 1, name: "Dr. Alisha Sharma", specialty: "Cardiology", fee: 800, available_slots: ["09:00 AM", "10:30 AM", "02:00 PM"] },
      { id: 2, name: "Dr. Rohan Verma", specialty: "Pediatrics", fee: 600, available_slots: ["11:00 AM", "01:00 PM", "04:30 PM"] }
    ]);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    setMessage(`🎉 Success! Appointment confirmed with ${selectedDoctor.name} at ${selectedSlot}`);
    setPatientName('');
    setSymptoms('');
    setSelectedSlot('');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1100px', margin: '0 auto', color: '#333' }}>
      <header style={{ borderBottom: '2px solid #0284c7', paddingBottom: '15px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#0284c7', margin: 0 }}>🏥 City Health Care Platform</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div>
          <section style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2>Step 1: Select a Medical Specialist</h2>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              {doctors.map(doc => (
                <div key={doc.id} onClick={() => { setSelectedDoctor(doc); setSelectedSlot(''); }} style={{ border: selectedDoctor?.id === doc.id ? '2px solid #0284c7' : '1px solid #cbd5e1', padding: '15px', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}>
                  <h4>{doc.name}</h4>
                  <p>{doc.specialty}</p>
                  <strong style={{ color: '#0284c7' }}>₹{doc.fee}</strong>
                </div>
              ))}
            </div>
          </section>
          {selectedDoctor && (
            <section style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
              <h2>Step 2: Appointment Details</h2>
              <form onSubmit={handleBooking} style={{ marginTop: '15px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Patient Name:</label>
                  <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} required style={{ width: '90%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Select Slot:</label>
                  {selectedDoctor.available_slots.map(slot => (
                    <button type="button" key={slot} onClick={() => setSelectedSlot(slot)} style={{ padding: '8px 12px', marginRight: '10px', background: selectedSlot === slot ? '#0284c7' : '#fff', color: selectedSlot === slot ? '#fff' : '#0284c7' }}>{slot}</button>
                  ))}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Symptoms:</label>
                  <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} required style={{ width: '90%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ background: '#22c55e', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Confirm Appointment</button>
              </form>
              {message && <div style={{ marginTop: '15px', padding: '12px', background: '#dcfce7', color: '#15803d' }}>{message}</div>}
            </section>
          )}
        </div>
        <div>
          <aside style={{ background: '#eff6ff', padding: '20px', borderRadius: '8px' }}>
            <h3>📊 Platform Features Guide</h3>
            <ul>
              <li><strong>Decoupled Architecture:</strong> Prepared for standard Django REST Framework API integration.</li>
              <li><strong>Dynamic UI Matrix:</strong> Interactive doctor and slot mapping framework.</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default App;