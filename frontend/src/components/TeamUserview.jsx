import React from 'react';

function TeamUserview() {
  const teamMembers = [
    { name: 'John Doe', email: 'john@example.com', role: 'Developer', joined: 'Jan 15, 2023' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', joined: 'Feb 20, 2023' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', joined: 'Nov 10, 2022' },
  ];

  const styles = {
    wrapper: {
      maxWidth: '100%',
      overflowX: 'auto',
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      padding: '40px 20px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      minWidth: '600px',
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
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Team Members (Team View)</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} style={index < teamMembers.length - 1 ? styles.rowBorder : {}}>
                <td style={styles.td}>
                  <div style={styles.memberName}>
                    <div style={styles.avatar}>{member.name.charAt(0)}</div>
                    <span>{member.name}</span>
                  </div>
                </td>
                <td style={styles.td}>{member.email}</td>
                <td style={styles.td}><span style={styles.badge}>{member.role}</span></td>
                <td style={styles.td}>{member.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamUserview;
