
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !formData.role) {
      toast({
        title: "Selecione um cargo",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2) {
      if (!formData.fullName || !formData.cpf || !formData.email) {
        toast({
          title: "Preencha todos os campos",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Senhas não coincidem",
          variant: "destructive"
        });
        return;
      }
      
      // Simular cadastro
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você pode fazer login agora"
      });
      navigate('/login');
      return;
    }
    
    setStep(step + 1);
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

        {/* Register Card */}
        <Card className="shadow-lg border-0" style={{ backgroundColor: '#D4C9BE' }}>
          <CardHeader className="text-center pb-4">
            <h2 className="text-xl font-semibold text-gray-800">Cadastro</h2>
            <Progress value={step === 1 ? 50 : 100} className="w-full mt-2" />
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Escolha o cargo</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perito">Perito</SelectItem>
                      <SelectItem value="assistente">Assistente</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700">Digite o nome completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="bg-white border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cpf" className="text-gray-700">Digite o CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})}
                    maxLength={14}
                    className="bg-white border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">Digite o e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-white border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="bg-white border-gray-300"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleNext}
              className="w-auto px-8 mx-auto block mt-6"
              style={{ backgroundColor: '#123458' }}
            >
              Próximo
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/login" className="text-gray-600 underline">
            Já possui uma conta? Faça login.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
