import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  onAuth: (token: string) => void;
}

export default function AdminAuth({ onAuth }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock PocketBase auth for demo
      if (email === '_superuser' && password === 'admin123') {
        const mockToken = 'mock_superuser_token_' + Date.now();
        localStorage.setItem('admin_token', mockToken);
        onAuth(mockToken);
        toast({
          title: "Авторизация успешна",
          description: "Добро пожаловать в админ-панель",
        });
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error) {
      toast({
        title: "Ошибка авторизации",
        description: "Проверьте логин и пароль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="Shield" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">
            Админ-панель
          </CardTitle>
          <CardDescription className="text-gray-600">
            Вход для суперпользователя
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Логин
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="_superuser"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-500 to-amber-500 hover:from-indigo-600 hover:to-amber-600 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Вход...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Icon name="LogIn" size={20} />
                  <span>Войти</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}