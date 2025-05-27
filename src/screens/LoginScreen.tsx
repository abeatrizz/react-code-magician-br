
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(cpf, password);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#123458' }}>
              <div className="w-6 h-6 bg-white rounded-full m-1"></div>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#123458' }}>IDentify</h1>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0" style={{ backgroundColor: '#D4C9BE' }}>
          <CardHeader className="text-center pb-4">
            <h2 className="text-xl font-semibold text-gray-800">Login</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="cpf" className="text-gray-700">Digite o seu CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  maxLength={14}
                  className="bg-white border-gray-300 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Digite a sua senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-gray-300 focus:border-blue-500"
                  required
                />
              </div>

              <div className="text-center">
                <Link to="/forgot-password" className="text-sm text-gray-600 underline">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-auto px-8 mx-auto block"
                style={{ backgroundColor: '#123458' }}
              >
                {loading ? 'Entrando...' : 'Próximo'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <span className="text-gray-600">Não tem uma conta? </span>
          <Link to="/register" className="text-blue-600 underline">
            Faça seu cadastro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
