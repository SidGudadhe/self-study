import { redirect } from 'next/navigation';

export default function SyllabusRedirectPage() {
  redirect('/student/subjects');
}
