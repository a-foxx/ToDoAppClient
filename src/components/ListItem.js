import React from 'react';
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'
import { useState } from 'react';

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/to-do/todos/${task.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getData()
      }
    } catch (error) {

    }
  }
    return (
      <li className='list-item'>
        <div className='info-container'>
          <TickIcon/>
          {task && <p>{task.title}</p>}
          {task && <ProgressBar progress={task.progress}/>}
        </div>
        <div className="button-container">
          <button className="edit" data-testid="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" data-testid = "delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
      </li>
    );
  }
  
  export default ListItem;
  