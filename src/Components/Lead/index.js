import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Lead = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({});
  const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['accessToken']);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prevLead) => ({ ...prevLead, [name]: value }));
  };
  const addLead = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/leads_create`, newLead);
      setNewLead({});
       fetchLeads();
    } catch (error) {
      console.log(error);
    }
  }
 

  const updateLead = async (id, updates) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/leads/${id}`, updates);
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };


  const deleteLead = async (leadId) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/leads/${leadId}`);
      setLeads(leads.filter(lead => lead.id !== leadId));
        alert("User deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
  };
  const handleLogout = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/signout`, {userCredentials: true});
    if(response){
        removeCookie('accessToken');
        navigate('/login')
    }
}
  return (
    <div>
      <h1>Leads</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>
                <select
                  value={lead.status}
                  onChange={(e) => updateLead(lead._id, { status: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteLead(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                name="name"
                value={newLead.name || ""}
                placeholder="Name"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name="email"
                value={newLead.email || ""}
                placeholder="Email"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name="phone"
                value={newLead.phone || ""}
                placeholder="Phone"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                name="status"
                value={newLead.status || "new"}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>Select your status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Canceled">Canceled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Lost">Lost</option>
              </select>
            </td>
            <td>
              <button onClick={addLead}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
        <div >
            <button type="button" class="btn btn-danger mt-5" onClick={handleLogout}>Logout</button>
            </div> 
    </div>
  );
  
}
export default Lead;