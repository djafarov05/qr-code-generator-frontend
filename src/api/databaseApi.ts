import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

interface QRCode {
  id?: string;
  user_id?: string;
  content: string;
  shortened_url?: string;
  color: string;
  size: number;
}

// Database API functions for QR code CRUD operations
export const databaseApi = {
  // Create new QR code
  createQRCode: async (qrCode: QRCode) => {
    const { data, error } = await supabase
      .from('qr_codes')
      .insert([qrCode])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's QR codes
  getQRCodes: async () => {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update QR code
  updateQRCode: async (id: string, updates: Partial<QRCode>) => {
    const { data, error } = await supabase
      .from('qr_codes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete QR code
  deleteQRCode: async (id: string) => {
    const { error } = await supabase
      .from('qr_codes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://hnzvkmbtrzucrvprbskm.supabase.co'
// const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseKey)