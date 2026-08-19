import Image from 'next/image';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
        <Image
          src="/logo-header.svg"
          alt=""
          width={140}
          height={40}
          className="relative z-10 brightness-0 invert"
        />
        <div className="relative z-10 max-w-md">
          <h1 className="font-heading font-bold text-3xl text-white leading-tight mb-3">
            El sistema de reservas de Guanacaste Tickets
          </h1>
          <p className="text-white/80 text-base">
            Gestiona reservas, confirma clientes y da seguimiento a tus tours desde un solo lugar.
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-surface lg:bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center">
            <Image src="/logo-header.svg" alt="Guanacaste Tickets" width={160} height={44} />
          </div>
          <h2 className="font-heading font-bold text-2xl text-gray-900 mb-1">Iniciar sesión</h2>
          <p className="text-sm text-gray-500 mb-8">Acceso exclusivo para el equipo.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
