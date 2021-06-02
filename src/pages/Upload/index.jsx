import React, { useState, useRef } from 'react';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { uploadImage } from '../../services/catService';
import { addToCatCatalogue } from '../../actions'

const Upload = ({addToCatCatalogue}) => {
    let history = useHistory();
    const [validationErrors, setValidationErrors] = useState({});
    const hiddenFileInput = useRef(null);
    const handleClick = (event) => hiddenFileInput.current.click();
    const handleChange = async (event) => {
        const uploadRes = await uploadImage(event.target.files[0]);
        const { status, data } = uploadRes;
        if (status === 'FAILED') {
            setValidationErrors({ status: status, reason: data.message });
        }else{
            addToCatCatalogue(data)
            history.push('/')
        }
    };
    return (
        <>
            {validationErrors.status === 'FAILED' && <div>{validationErrors.reason}</div>}
            <Button variant="contained" color="primary" onClick={handleClick}>
                Upload image
            </Button>
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
        </>
    );
};

export default connect(null, {
    addToCatCatalogue: (...args) => addToCatCatalogue(...args),
})(Upload)
