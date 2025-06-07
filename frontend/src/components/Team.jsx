import React, { useState } from 'react';

function App() {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      joined: 'Jan 15, 2023',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Designer',
      joined: 'Feb 20, 2023',
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Manager',
      joined: 'Nov 10, 2022',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', joined: '' });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(teamMembers[index]);
  };

  const handleDelete = (index) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
    if (editingIndex === index) setEditingIndex(null); // Cancel editing if deleted
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updated = [...teamMembers];
    updated[editingIndex] = formData;
    setTeamMembers(updated);
    setEditingIndex(null);
    setFormData({ name: '', email: '', role: '', joined: '' });
  };

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, {
      name: 'New Member',
      email: 'new@example.com',
      role: 'Intern',
      joined: new Date().toLocaleDateString(),
    }]);
  };

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f9fafb',
      padding: '40px',
      fontFamily: 'sans-serif',
      margin: 0,
      boxSizing: 'border-box',
      overflow: 'auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
    },
    addButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      fontWeight: 500,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    th: {
      backgroundColor: '#f3f4f6',
      padding: '16px',
      textAlign: 'left',
      fontWeight: 600,
      color: '#4b5563',
    },
    td: {
      padding: '16px',
      textAlign: 'left',
      color: '#4b5563',
    },
    rowBorder: {
      borderBottom: '1px solid #e5e7eb',
    },
    memberName: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    avatar: {
      backgroundColor: '#e5e7eb',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#1f2937',
      fontSize: '18px',
    },
    badge: {
      backgroundColor: '#f3f4f6',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#111827',
    },
    editButton: {
      background: 'none',
      border: 'none',
      color: '#10b981',
      fontWeight: 500,
      marginRight: '12px',
      cursor: 'pointer',
    },
    deleteButton: {
      background: 'none',
      border: 'none',
      color: '#ef4444',
      fontWeight: 500,
      cursor: 'pointer',
    },
    input: {
      width: '90%',
      padding: '6px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 500,
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Team Members</h2>
        <button style={styles.addButton} onClick={handleAddMember}>+ Add Member</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Joined</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index} style={index < teamMembers.length - 1 ? styles.rowBorder : {}}>
              {editingIndex === index ? (
                <>
                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      name="joined"
                      value={formData.joined}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={styles.td}>
                    <button style={styles.saveButton} onClick={handleSave}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={styles.td}>
                    <div style={styles.memberName}>
                      <div style={styles.avatar}>{member.name.charAt(0)}</div>
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{member.email}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{member.role}</span>
                  </td>
                  <td style={styles.td}>{member.joined}</td>
                  <td style={styles.td}>
                    <button style={styles.editButton} onClick={() => handleEdit(index)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
