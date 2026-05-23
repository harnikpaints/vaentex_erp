import { z } from 'zod';

export const companyProfileSchema = z.object({
  name: z.string().min(2, 'Company name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  gst_number: z.string().optional(),
  pan_number: z.string().optional(),
  cin_number: z.string().optional(),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  ifsc_code: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string().min(2, 'Client name required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  gst_number: z.string().optional(),
  contact_person: z.string().optional(),
});

export const invoiceSchema = z.object({
  invoice_number: z.string().min(1, 'Invoice number required'),
  client_id: z.string().uuid('Valid client required'),
  invoice_date: z.string(),
  due_date: z.string().optional(),
  po_number: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.number().positive(),
    unit_price: z.number().positive(),
    tax_rate: z.number().min(0).max(100),
    hsn_code: z.string().optional(),
  })).min(1, 'At least one item required'),
});

export const challanSchema = z.object({
  challan_number: z.string().min(1),
  client_id: z.string().uuid(),
  invoice_id: z.string().uuid().optional(),
  challan_date: z.string(),
  delivery_date: z.string().optional(),
  vehicle_number: z.string().optional(),
  driver_name: z.string().optional(),
  driver_phone: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.number().positive(),
    unit: z.string().min(1),
    batch_number: z.string().optional(),
    hsn_code: z.string().optional(),
  })).min(1),
});

export const materialSchema = z.object({
  name: z.string().min(1, 'Material name required'),
  sku: z.string().min(1, 'SKU required'),
  unit: z.string().min(1, 'Unit required'),
  reorder_level: z.number().optional(),
  unit_cost: z.number().optional(),
  hsn_code: z.string().optional(),
  gst_rate: z.number().optional(),
});

export const formationSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  base_quantity: z.number().positive(),
  unit: z.string().min(1),
  yield_percentage: z.number().min(0).max(100).default(100),
});

export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type ChallanInput = z.infer<typeof challanSchema>;
export type MaterialInput = z.infer<typeof materialSchema>;
export type FormulationInput = z.infer<typeof formationSchema>;
