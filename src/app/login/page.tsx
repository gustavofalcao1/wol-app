import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Wake-on-LAN
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Login to manage your devices
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
