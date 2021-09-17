import { useState } from "react";
import { Input, Label, FormGroup, Form } from "reactstrap";

const InputField = ({ placeholder, labelName, input, setInput, id,type }) => {
   const [inputValue, setInputValue] = useState();

   return (
      <FormGroup>
         <Label for={id && id}>{labelName}</Label>
         <Input
            id={id && id}
            type={type && type}
            placeholder={placeholder}
            autoFocus={true}
            onChange={e => {
               setInput && setInput(e.target.value);
            }}
            value={input && input}></Input>
      </FormGroup>
   );
};
export default InputField;
