import { Spinner, Toast, ToastBody, ToastHeader } from "reactstrap"

const Footer = () => {
   const toster = (
      <Toast>
         <ToastHeader icon={<Spinner size="sm" />}>Alert</ToastHeader>
         <ToastBody>This is a toast on a white background </ToastBody>
      </Toast>
   );
   return (
      <footer className="footer">

         <div className="container">{toster }</div>
      </footer>
   )
}
export default Footer