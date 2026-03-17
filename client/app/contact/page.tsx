import AppointmentForm from "@/app/components/contact/AppointmentForm";
import ContactDetails from "@/app/components/contact/ContactDetails";

const ContactPage = () => {
  return (
    <main className="pt-24">
      <section className="bg-mano-bg py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-20 lg:flex-row">
            <ContactDetails />
            <AppointmentForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
