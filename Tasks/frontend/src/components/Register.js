import React,{useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        ownerName: '',
        rollNo: '',
        ownerEmail: '',
        accessCode: ''
      });
      const [registrationDetails, setRegistrationDetails] = useState(null); 
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/register', formData);
          setRegistrationDetails(response.data); 
          alert('Registration successful');
        } catch (error) {
          console.error(error);
          alert('Error registering');
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input type="text" name="companyName" onChange={handleInputChange} required />
        <br />
        <label>Owner Name</label>
        <input type="text" name="ownerName" onChange={handleInputChange} required />
        <br />

        <label>Roll No</label>
        <input type="text" name="rollNo" onChange={handleInputChange} required />
        <br />

        <label>Owner Email</label>
        <input type="email" name="ownerEmail" onChange={handleInputChange} required />
        <br />

        <label>Access Code</label>
        <input type="text" name="accessCode" onChange={handleInputChange} required />

        <button type="submit">Register</button>
      </form>
      {
        registrationDetails && (
          <div>
            <h2>Registration Details (JSON Format):</h2>
            <pre>{JSON.stringify(registrationDetails, null, 2)}</pre>
          </div>
        )
      }
    </div>
  )
}

export default Register