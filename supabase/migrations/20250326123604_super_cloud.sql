/*
  # Create QR Codes table and security policies

  1. New Tables
    - `qr_codes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `shortened_url` (text)
      - `color` (text)
      - `size` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `qr_codes` table
    - Add policies for authenticated users to:
      - Create their own QR codes
      - Read their own QR codes
      - Update their own QR codes
      - Delete their own QR codes
*/

CREATE TABLE IF NOT EXISTS qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  shortened_url text,
  color text DEFAULT '#000000',
  size integer DEFAULT 256,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own QR codes
CREATE POLICY "Users can read own QR codes"
  ON qr_codes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own QR codes
CREATE POLICY "Users can create QR codes"
  ON qr_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own QR codes
CREATE POLICY "Users can update own QR codes"
  ON qr_codes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to delete their own QR codes
CREATE POLICY "Users can delete own QR codes"
  ON qr_codes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);