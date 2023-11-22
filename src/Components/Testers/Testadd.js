import React, { useState } from 'react';
import "./Testadds.css";
import axios from 'axios';

const Testadd = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };


  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };

  const modalRef = React.createRef();

  return (
    <div className='App'>
      <button onClick={openModal} className="btn">
          Add
        </button>

      {modalVisible && (
        <div 
          ref={modalRef}
          className="modalspri"
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}></span>
          
              <form>
                <div className="form-group">
                  <label htmlFor="ActualResults">Actual Result</label>
                  <input name="ActualResults" />
                </div>
                <div className="form-group">
                  <label htmlFor="Statuss">Status</label>
                  <input name="Statuss" />
                </div>
                <div className="form-group">
                  <label htmlFor="Remark_sp">Remarks</label>
                  <input name="Remark_sp" />
                </div>
                <div className="form-group">
                  <label htmlFor="Bug_ID">Bug ID</label>
                  <input name="Bug_IDs" />
                </div>
                <div className="form-group">
                  <label htmlFor="Image_Upload">Image Upload</label>
                    <input style={{border:"none"}} type="file" id="myFile" name="filename" />
                </div>
                <div className="form-group">
                  <label htmlFor="Video_Upload">Video Upload</label>
                  <iframe width="200" height="120" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">
                  </iframe>
                </div>
                <div className="form-group">
                  <label htmlFor="Tester_Name">Tester Name</label>
                  <input name="Tester_Name" />
                </div>
                <button style={{ marginLeft: "576px"}} type="submit" className="btn">
                  Submit
                </button>
              </form>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Testadd;
