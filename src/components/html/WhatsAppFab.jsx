import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

export default function WhatsAppFab() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    mobile: '',
    projectType: '',
    eventDate: '',
    location: '',
    message: ''
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const projectTypes = [
    "Wedding / Pre-Wedding",
    "Commercial / Ad Film",
    "Music Video",
    "Corporate / Event",
    "Documentary / Short Film",
    "Product Photography",
    "Other"
  ];

  const handleShare = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    const { name, company, email, mobile, projectType, eventDate, location, message } = formData;
    const subject = `Enquiry from ${name} ${company ? `(${company})` : ''} - ${projectType || 'Project'}`;
    
    // Construct email body with all fields
    const bodyText = [
      `Name: ${name}`,
      `Company: ${company || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      `Mobile: ${mobile}`,
      `Project Type: ${projectType || 'N/A'}`,
      `Event Date: ${eventDate || 'N/A'}`,
      `Location: ${location || 'N/A'}`,
      '',
      'Message:',
      message
    ].join('\n');
    
    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:contact@asfilmmaking.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    setShowModal(false);
  };

  return (
    <>
      <div className="bottom-action-pill">
        <a 
          href="https://wa.me/91XXXXXXXXXX" 
          className="pill-btn btn-whatsapp" 
          aria-label="Message on WhatsApp" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="fab-icon">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49"/>
          </svg>
          <span className="fab-text">WhatsApp Us</span>
        </a>

        <button className="pill-btn btn-share" onClick={handleShare}>
          <Phone size={18} className="fab-icon" />
          <span className="fab-text">Share Contact Details</span>
        </button>
      </div>

      {showModal && (
        <div className="contact-modal-overlay" onClick={handleClose}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="contact-modal-close" onClick={handleClose}>
              <X size={16} />
            </button>
            <div className="contact-modal-header">
              <span className="contact-modal-label">CONTACT ASFILMMAKING</span>
              <h2>Share your details</h2>
              <p>Tell us a bit about your project. Your email app will open with the enquiry prefilled for contact@asfilmmaking.com.</p>
            </div>
            <form className="contact-modal-form" onSubmit={handleSend}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full name *</label>
                  <input type="text" name="name" placeholder="Your full name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Company / Brand</label>
                  <input type="text" name="company" placeholder="Company name (optional)" value={formData.company} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mobile number *</label>
                  <input type="tel" name="mobile" placeholder="+91 98765 43210" required value={formData.mobile} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Project Type</label>
                  <div className="custom-select-container">
                    <div 
                      className={`custom-select-trigger ${dropdownOpen ? 'open' : ''}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span style={{ opacity: formData.projectType ? 1 : 0.6 }}>
                        {formData.projectType || 'Select project type'}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    {dropdownOpen && (
                      <div className="custom-select-dropdown">
                        {projectTypes.map((type) => (
                          <div 
                            key={type} 
                            className={`custom-select-option ${formData.projectType === type ? 'selected' : ''}`}
                            onClick={() => {
                              setFormData({ ...formData, projectType: type });
                              setDropdownOpen(false);
                            }}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Event Date / Timeline</label>
                  <input type="text" name="eventDate" placeholder="e.g., Oct 24, 2026 or Next Summer" value={formData.eventDate} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Location / Venue</label>
                <input type="text" name="location" placeholder="City or specific venue" value={formData.location} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Message / Project Details *</label>
                <textarea name="message" placeholder="Tell us about your project requirements, estimated budget, or any references." required value={formData.message} onChange={handleChange}></textarea>
              </div>
              <div className="form-footer">
                <span className="contact-modal-note">You can also reach us directly at contact@asfilmmaking.com.</span>
                <button type="submit" className="contact-modal-submit">Send Enquiry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}