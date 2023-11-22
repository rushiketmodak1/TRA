import React, { useEffect, useState } from 'react';
import "./Testadds.css"
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ENDPOINTS } from '../../endpoints/endpoints';

const Testadd = ({ onUpdateData,id,setRows ,index, rows}) => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    actualResult: '',
    status: '',
    remarks: '',
    bugId: '',
    // ScreenShots: '',
    // videos:'',
  });

  
  const openModal = () => {
    setModalVisible(true);     
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log("FOrmdata:",formData);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    // Send PUT request to the API with formData
    console.log("formData::: ", formData)
    axios.put(`${ENDPOINTS}/testerFeedBack/${id}`, formData)
      .then((response) => {
        let tempRowData=[...rows];
        tempRowData[index] = response.data.updatedRelease;

        // setFormData(tempRowData);
        setRows(tempRowData)
        console.log("Response:", response.data.updatedRelease);
        // Handle response as needed
      })
      .catch((err) => {
        console.error("Error:", err);
        // Handle errors as needed
      });
     

    closeModal();
  };

  const handleOutsideClick = (event) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };

  const EditButton = styled(BsFillPencilFill)({
    cursor: 'pointer',
  });

  const modalRef = React.createRef();

  return (
    <div className='App'>
      <EditButton onClick={openModal} className="edit-btn" />

      {modalVisible && (
        <div
          ref={modalRef}
          className="modalspri"
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}></span>

            <form onSubmit={(e) => handleSubmit(e, id)}>
              <div className="form-group">
                <label htmlFor="actualResult">Actual Result</label>
                <input
                  name="actualResult"
                  value={formData.actualResult}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />           </div>
              {/* Other form fields */}
              <div className="form-group">
                <label htmlFor="remarks">Remarks</label>
                <input name="remarks" value={formData.remarks} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="bugId">Bug ID</label>
                <input name="bugId" value={formData.bugId} onChange={handleInputChange}  />
              </div>
              {/* <div className="form-group">
                <label htmlFor="ScreenShots">Image Upload</label>
                <input style={{ border: "none" }} type="file" id="myFile" name="ScreenShots" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="videos">Video Upload</label>
                <iframe width="200" height="120" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1" name="videos">
                </iframe>
              </div> */}
              

              <button
                style={{ marginLeft: "576px" }}
                type="submit"
                className="btn">
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
