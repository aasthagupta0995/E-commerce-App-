import React from 'react'
import axios from 'axios'

type Customer = {
    id: number
    name: string
    email: string
    role: string
    joinedAt: string
}

const Customers = () => {
        const [customers, setCustomers] = React.useState<Customer[]>([])

        const fallbackCustomers: Customer[] = [
                { id: 1, name: 'Maya Chen', email: 'maya.chen@gmail.com', role: 'Premium', joinedAt: '2024-07-01' },
                { id: 2, name: 'Daniel Reed', email: 'daniel.reed@gmail.com', role: 'Standard', joinedAt: '2024-07-03' },
                { id: 3, name: 'Aarav Singh', email: 'aarav.singh@gmail.com', role: 'Premium', joinedAt: '2024-07-05' },
        ]

    React.useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers')
                                setCustomers(response.data as Customer[])
            }
            catch (error) {
                console.error('Error fetching customers:', error)
                                setCustomers(fallbackCustomers)
            }
        }

        fetchCustomers()
    }
    , [])

  return (
        <main className="admin-page-shell">
            <section className="admin-hero">
                <div>
                    <p className="eyebrow">Customer Management</p>
                    <h1>Customer relationship overview</h1>
                    <p>Monitor customer growth, track account tiers, and maintain retention quality.</p>
                </div>
            </section>

            <section className="admin-kpi-grid">
                <article className="admin-kpi-card">
                    <p>Total Customers</p>
                    <strong>{customers.length}</strong>
                    <span>Current account records</span>
                </article>
                <article className="admin-kpi-card">
                    <p>Premium Members</p>
                    <strong>{customers.filter((item) => item.role === 'Premium').length}</strong>
                    <span>High-value segment</span>
                </article>
                <article className="admin-kpi-card">
                    <p>New This Week</p>
                    <strong>27</strong>
                    <span>Compared to last week</span>
                </article>
            </section>

            <section className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <span className={customer.role === 'Premium' ? 'status-pill ok' : 'status-pill'}>
                                        {customer.role}
                                    </span>
                                </td>
                                <td>{customer.joinedAt}</td>
                                <td className="table-actions">
                                    <button type="button">View</button>
                                    <button type="button" className="ghost-btn">Message</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
  )
}

export default Customers