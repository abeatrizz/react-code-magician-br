
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, UserCheck, UserX, Users } from 'lucide-react';
import Logo from '@/components/Logo';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'admin' | 'perito' | 'assistente';
  active: boolean;
}

const AdminUsersScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. João Silva',
      email: 'joao.silva@odontolegal.com',
      cpf: '12345678901',
      role: 'perito',
      active: true
    },
    {
      id: '2',
      name: 'Dra. Maria Santos',
      email: 'maria.santos@odontolegal.com',
      cpf: '10987654321',
      role: 'perito',
      active: true
    },
    {
      id: '3',
      name: 'Ana Oliveira',
      email: 'ana.oliveira@odontolegal.com',
      cpf: '11122233344',
      role: 'assistente',
      active: false
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    cpf: '',
    role: 'perito' as 'admin' | 'perito' | 'assistente',
    password: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      cpf: newUser.cpf,
      role: newUser.role,
      active: true
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', cpf: '', role: 'perito', password: '' });
    setIsDialogOpen(false);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  const activeUsers = users.filter(user => user.active);
  const inactiveUsers = users.filter(user => !user.active);

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Logo size="medium" variant="dark" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#123458' }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Usuário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-name">Nome Completo</Label>
                <Input
                  id="new-name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="new-cpf">CPF</Label>
                <Input
                  id="new-cpf"
                  value={newUser.cpf}
                  onChange={(e) => setNewUser({...newUser, cpf: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="new-role">Função</Label>
                <select
                  id="new-role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as 'admin' | 'perito' | 'assistente'})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="perito">Perito</option>
                  <option value="assistente">Assistente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <Label htmlFor="new-password">Senha Inicial</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                />
              </div>
              <Button 
                onClick={handleCreateUser}
                style={{ backgroundColor: '#123458' }}
                className="w-full"
              >
                Criar Usuário
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Usuários Ativos */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#123458' }}>
            <UserCheck className="h-5 w-5" />
            Usuários Ativos ({activeUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === 'admin' ? 'Administrador' : 
                     user.role === 'perito' ? 'Perito' : 'Assistente'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Usuários Inativos */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#123458' }}>
            <UserX className="h-5 w-5" />
            Usuários Inativos ({inactiveUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inactiveUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-gray-500">{user.name}</TableCell>
                  <TableCell className="text-gray-500">{user.email}</TableCell>
                  <TableCell className="text-gray-500">
                    {user.role === 'admin' ? 'Administrador' : 
                     user.role === 'perito' ? 'Perito' : 'Assistente'}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersScreen;
