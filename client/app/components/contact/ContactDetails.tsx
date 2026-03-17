import { Mail, MapPin, Phone } from "lucide-react";

const ContactDetails: React.FC = () => {
  return (
    <div className="space-y-12 lg:w-1/3">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-mano-dark md:text-5xl">Contact Mano</h1>
        <p className="text-lg text-mano-grey">
          Ready to start your journey back to full health? Contact our specialists
          today.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="rounded-2xl bg-mano-primary p-4 text-white shadow-lg shadow-mano-primary/20">
            <Phone size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-mano-grey">
              Call Us
            </p>
            <p className="text-xl font-bold text-slate-900">123-456-7890</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="rounded-2xl bg-mano-primary p-4 text-white shadow-lg shadow-mano-primary/20">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-mano-grey">
              Email
            </p>
            <p className="text-xl font-bold text-slate-900">info@manophysio.com</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="rounded-2xl bg-mano-primary p-4 text-white shadow-lg shadow-mano-primary/20">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-mano-grey">
              Location
            </p>
            <p className="text-xl font-bold text-slate-900">456 Recovery Road, NY 10001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
