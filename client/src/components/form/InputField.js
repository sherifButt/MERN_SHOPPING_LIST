import { Input, Label, FormGroup } from "reactstrap";

const InputField = ({ placeholder, labelName, input, setInput, id, type, autoFocus }) => {
   return (
      <FormGroup>
         <Label for={id && id}>{labelName}</Label>
         <Input
            id={id && id}
            type={type && type}
            placeholder={placeholder}
            autoFocus="autofocus"
            autofocus
            onChange={e => {
               setInput && setInput(e.target.value);
            }}
            value={input && input}></Input>
      </FormGroup>
   );
};
export default InputField;
