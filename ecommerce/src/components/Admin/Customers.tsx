import React from 'react'
import axios from 'axios'

const Customers = () => {
    const [customers, setCustomers] = React.useState([])

    React.useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers')
                setCustomers(response.data)
            }
            catch (error) {
                console.error('Error fetching customers:', error)
            }
        }

        fetchCustomers()
    }
    , [])

  return (
    <table>
      <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
           
            <th>Role</th>
             <th>Actions </th>
             <th>Joined At</th>
        </tr>
        </thead>
        <tbody>
        {customers.map((customer:any) => (
            <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                
                <td>{customer.role}</td>
                <td>{customer.joinedAt}</td>
            </tr>
        ))}
        </tbody>
    </table>
  )
}

export default Customers