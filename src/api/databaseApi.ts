// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// interface QRCode {
//   id?: string;
//   user_id?: string;
//   content: string;
//   shortened_url?: string;
//   color: string;
//   size: number;
// }


// export const databaseApi = {

//   createQRCode: async (qrCode: QRCode) => {
//     const { data, error } = await supabase
//       .from('qr_codes')
//       .insert([qrCode])
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

  
//   getQRCodes: async () => {
//     const { data, error } = await supabase
//       .from('qr_codes')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   },


//   updateQRCode: async (id: string, updates: Partial<QRCode>) => {
//     const { data, error } = await supabase
//       .from('qr_codes')
//       .update(updates)
//       .eq('id', id)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   deleteQRCode: async (id: string) => {
//     const { error } = await supabase
//       .from('qr_codes')
//       .delete()
//       .eq('id', id);

//     if (error) throw error;
//   }
// };

