import ContactForm from "@/components/ContactForm";

export default function TestContact() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8 font-mono text-center">
          TEST CONTACT FORM
        </h1>
        <div className="bg-gray-900 border border-red-700 p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
