import { redirect } from 'next/navigation';

export default function NotesRedirectPage() {
  redirect('/student/revision?tab=notes');
}
