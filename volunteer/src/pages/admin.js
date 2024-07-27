import React from 'react'
import './admin.css'
const Admin = () => {
  return (
    <div>
        <div className='head1'>Aspire & Glee</div>
        <div className='head2'>My Admin Portal</div>
        <div className="Volunteers">
            <button className='Volunteers'>Volunteers</button>
        </div>
        <div className="Donors">
        <button className="Donors">Donors</button>
        </div>
        <div className="Inventory">
        <button className="Inventory">Inventory</button>
        </div>
    </div>
  )
}

export default Admin