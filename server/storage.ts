// In-memory storage implementation to replace database storage
import { z } from "zod";
import { contactSchema } from "../shared/schema";

// Types
type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};

// In-memory storage
class InMemoryStorage {
  private contacts: Contact[] = [];

  async createContactMessage(data: z.infer<typeof contactSchema>): Promise<Contact> {
    const newContact = {
      id: this.contacts.length + 1,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date()
    };

    this.contacts.push(newContact);
    return newContact;
  }

  async getContactMessages(): Promise<Contact[]> {
    return this.contacts;
  }
}

// Export storage instance
export const storage = new InMemoryStorage();