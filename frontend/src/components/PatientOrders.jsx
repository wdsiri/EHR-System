import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';
import { useUser } from '../contexts/UserContext.js';

function PatientOrders({ selectedPatient }) {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      if (selectedPatient) {
        axios.get(`http://localhost:3001/patients/${selectedPatient.id}/orders`)
          .then(response => {
            setOrders(response.data);
          })
          .catch(error => {
            toast.error(`Failed to fetch orders: ${error.message}`);
          });
      }
    };

    const intervalId = setInterval(fetchOrders, 1000); // Fetch orders every second

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount or selectedPatient change
    };
  }, [selectedPatient]);

  const toggleVisibilityForStudent = async (order, index) => {
    console.log(order);
    const newVisibility = !order.visibleToStudents;
    try {
      if (!order.orderId) {
        throw new Error('Order ID is undefined');
      }
  
      const response = await axios.put(`http://localhost:3001/patients/${selectedPatient.id}/orders/${order.orderId}/visibility`, {
        visibleToStudents: newVisibility
      });
  
      console.log(response.data);
  
      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders];
        updatedOrders[index] = {
          ...order,
          visibleToStudents: newVisibility
        };
        return updatedOrders;
      });
    } catch (error) {
      toast.error(`Failed to update order visibility: ${error.message}`);
    }
  };
  
 

  return (
    <div className={styles.someClassName}>
      <div style={{
        margin: '4vh',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          borderBottom: '2px solid #007bff',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>Patient Orders</h3>

        {orders.filter(order => user.role === 'instructor' || order.visibleToStudents).map((order, index) => (
          <div key={order.order_id} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,.1)'
          }}>

            <p><strong>Description:</strong> {order.description}</p>
            {user.role === 'instructor' && (
              <button onClick={() => toggleVisibilityForStudent(order, index)} style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: order.visibleToStudents ? '#4CAF50' : '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                {order.visibleToStudents ? 'Hide from Students' : 'Show to Students'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientOrders;
