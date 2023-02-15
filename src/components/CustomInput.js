import React from 'react';

const CustomInput = (props) => {
    const { type, label, i_id, i_class, name, val, onCh, OnBl } = props;
    return (
        <div className="form-floating mt-2">
            <input
                type={type}
                className={`form-control ${i_class}`}
                id={i_id}
                placeholder={label}
                name={name}
                value={val}
                onChange={onCh}
                onBlur={OnBl}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    )
}

export default CustomInput