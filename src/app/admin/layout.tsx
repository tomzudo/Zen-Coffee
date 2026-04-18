import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const admin = cookieStore.get('admin')?.value === 'true';

  if (!admin) {
    redirect('/login');
  }

  return <>{children}</>;
}