import React from "react";

const CustomSelect = ({id, options, onChange, styleClass}) => {
    
    return (
        <select className={styleClass} id={id} onChange={onChange}>
            <option value={0} selected>Выберите уровень</option>
            {
                
                options.map((option, index) => 
                    <option  key={id + index} value={option.id}>{option.level_name}</option>
                )
            }
        </select>
    )
}

export default CustomSelect;