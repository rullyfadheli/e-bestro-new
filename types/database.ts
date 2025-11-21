// types/database.ts

export type SubmissionStatus = 'pending' | 'accepted' | 'rejected';

// Interface untuk data dari tabel 'profiles'
export interface Profile {
  full_name: string;
  nim: string;
}

// Interface untuk data dari tabel 'berkas' beserta data profile terkait
export interface Berkas {
  id: number;
  created_at: string;
  jenis_laporan: string;
  file_url: string;
  status: SubmissionStatus;
  user_id: string;
  rejection_reason: string | null;
  // Ini untuk menampung data profile yang kita 'join'
  profiles: Profile | null;
}