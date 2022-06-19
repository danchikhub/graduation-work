import React from "react";
import { useForm } from "react-hook-form";
const SelectComp =  ({name, id, options,title, onChange, styleClass, property}) => {
    
    return (
        
             <select 
                
                className={styleClass}
                id={id} 
                onChange={onChange}
                
            >
            <option value={0}>{title}</option>
            {
                
                options.map((option, index) => 
                    <option  key={id + index} value={option.id}>{option[property]}</option>
                )
            }
        </select>
       
        
       
        
    )
}

export default SelectComp;