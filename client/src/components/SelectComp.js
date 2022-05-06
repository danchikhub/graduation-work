import React from "react";

const SelectComp = ({id, options,title, onChange, styleClass, property}) => {
    
    return (
        <select className={styleClass} id={id} onChange={onChange}>
            <option value={0} selected>{title}</option>
            {
                
                options.map((option, index) => 
                    <option  key={id + index} value={option.id}>{option[property]}</option>
                )
            }
        </select>
    )
}

export default SelectComp;