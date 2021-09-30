import { Input, Label, FormGroup, FormFeedback } from 'reactstrap';

const InputField = ({
   placeholder,
   labelName,
   input,
   setInput,
   id,
   type,
   autoFocus,
   valid,
   invalid,
   validMessage,
   invalidMessage
}) => {
   return (
      <FormGroup>
         <Label for={id && id}>{labelName}</Label>
         <Input
            id={id && id}
            type={type && type}
            placeholder={placeholder}
            autoFocus="autofocus"
            valid={valid}
            invalid={invalid}
            onChange={e => {
               setInput && setInput(e.target.value);
            }}
            value={input && input}></Input>
         <FormFeedback valid={valid && valid}>
            {validMessage && validMessage}
         </FormFeedback>
         <FormFeedback invalid={valid && valid}>
            {invalidMessage && invalidMessage}
         </FormFeedback>
      </FormGroup>
   );
};
export default InputField;
