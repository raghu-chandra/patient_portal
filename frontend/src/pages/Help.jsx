import React, { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    question: 'How do I upload medical documents?',
    answer: 'Go to the File Manager and use the upload button to add your files.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, your data is encrypted and securely stored.',
  },
  {
    question: 'How can I contact support?',
    answer: 'Use the contact form below or email support@patientportal.com.',
  },
];

const Help = () => {
  const { addNotification } = useNotifications();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Message Sent',
        message: 'Our support team will get back to you shortly.',
      });
      setSubmitting(false);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Help & Support</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map(({ question, answer }, i) => (
            <div key={i} className="border rounded p-4">
              <p className="font-medium">{question}</p>
              <p className="text-muted-foreground mt-1">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-black dark:text-white"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-black dark:text-white"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-black dark:text-white"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Help;
