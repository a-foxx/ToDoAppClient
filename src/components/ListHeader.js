import React from 'react'
import Modal from './Modal'
import { useState } from 'react'

const ListHeader = ({ listName, getData, handleSignOut }) => {
const [showModal, setShowModal] = useState(false)

  const handleSignOutClick = () => {
    handleSignOut()
  }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className='button-container'>
          <button className='create' data-testid="add-new" onClick={() => setShowModal(true)}>ADD NEW</button>
          <button className='signout' data-testid="sign-out" onClick={handleSignOutClick}>SIGN OUT</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
      </div>
    );
  }
  
  export default ListHeader;
  