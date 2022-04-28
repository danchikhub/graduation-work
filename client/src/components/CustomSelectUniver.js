import React from "react";

const CustomSelectUniver = ({id, options, onChange, styleClass}) => {
    
    return (
        <select onChange={onChange} className={styleClass} id={id} >
            {
                options.map((option, index) => 
                    <option key={id + index} value={option.id}>{option.univer_name}</option>
                )
            }
        </select>
    )
}

export default CustomSelectUniver;